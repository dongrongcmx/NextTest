/*
 * @Author: chengmx 
 * @Date: 2019-02-21 10:40:53 
 * @Last Modified by: chengmx
 * @Last Modified time: 2019-02-22 16:44:29
 * 
 * 长列表
 */

import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { ListView } from 'antd-mobile';
import glamorous from 'glamorous';
import * as glamor from 'glamor';
import store from 'store2';


import { delay } from '../../until/helps';

const ICON_ACTIVITY_INDICATOR = 'static/images/activity_indicator.png';

const SListView = glamorous(ListView)({
  paddingTop: 0,
  flex: 1,
  display:'flex',
  flexWrap:'wrap',
  [`& .am-list-header`]: {
    padding: '0 !important'
  },
  [`& .am-list-body`]: {
    backgroundColor: 'transparent',
    padding: '0',
    border: 'none'
  },
  [`& .am-list-body::before`]: {
    content: '',
    backgroundColor: 'transparent !important'
  },
  [`& .am-list-body::after`]: {
    content: '',
    backgroundColor: 'transparent !important'
  },
  [`& .am-list-footer`]: {
    padding: 0
  },
  [`& .am-list-view-scrollview-content`]: {
    // position: 'static !important'
  },
  [`& .am-pull-to-refresh-content-wrapper`]: {
    paddingBottom: '3px'
  }
});

const FootContainer = glamorous.div(
  {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '8px 0'
  }
);

const Container = glamorous.div({
  marginBottom: '4px'
});

const Icon = glamorous.img(
  {
    width: '27px',
    height: '27px',
    objectFig: 'contain'
  },
  () => {
    const rotate = glamor.css.keyframes({
      from: { transform: `rotate(0deg)` },
      to: { transform: `rotate(360deg)` }
    });
    return { animation: `${rotate} 1.5s infinite linear` };
  }
);
const Text = glamorous.p({
  fontSize: '18px',
  color: '#333',
  marginTop:'20px'
});

export default class GListView extends Component {
    static propTypes = {
      data: PropTypes.array, // 外部传入的数据源
      renderHeader: PropTypes.func,
      renderFooter: PropTypes.func,
      renderRow: PropTypes.func.isRequired,
      renderSeparator: PropTypes.func,
      isLoading: PropTypes.bool, // 是否正在加载中(根据model loading)
      hasNext: PropTypes.bool, // 是否还有下一页
      fetchData: PropTypes.func, // 请求搜索设备的接口(action)
      pageSize: PropTypes.number, // 每页显示的条目数，默认20
      isFirstLoad: PropTypes.bool, // 是否首次进来加载数据(请求接口)
      onEndReachedThreshold: PropTypes.number, // 距离底部多少距离触发endReached
      isPullToRefresh: PropTypes.bool, // 是否显示下拉加载组件
      isHideTechSupport: PropTypes.bool, // 是否显示技术支持
      changeCategoryPageNumber: PropTypes.func, // 如果有多个种类共用一个列表组件，需要保存当前选中的种类列表所在的页
      pageNumber: PropTypes.number, // 与 changeCategoryPageNumber 配合使用
      isOutDataControl: PropTypes.bool, // 数据是否是外部控制(model) 否则是内部维护state
      horizontal: PropTypes.bool,
      isKeepLive: PropTypes.bool, // 如有本地缓存则使用
      isSaveListData: PropTypes.bool // listview退出的时候是否保存数据(localstorage)
    };

    static defaultProps = {
      isOutDataControl: false,
      isFirstLoad: false,
      data: [],
      hasNext: false,
      pageSize: 20,
      isPullToRefresh: true,
      isHideTechSupport: false,
      horizontal: false,
      renderFooter: () => {},
      isKeepLive: false
    };

    constructor(props) {
      super(props);

      this.ds = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      });

      this.cacheData = store.get('listview-cache');

      let data = [];
      let hasNext = false;
      let pageNumber = 1;
      if (this.props.isKeepLive && this.cacheData) {
        data = this.cacheData.data;
        hasNext = this.cacheData.hasNext;
        pageNumber = this.cacheData.pageNumber;
        this.useCacheData = true;
      } else {
        data = this.props.data;
        hasNext = this.props.data;
        pageNumber = 1;
      }

      this.state = {
        dataSource: this.ds.cloneWithRows(data),
        refreshing: false,
        height:800,
        useBodyScroll: false,
        pageNumber: pageNumber, // 当前第几页
        hasNext: hasNext
      };
    }

    componentDidMount = async () => {
      if (this.props.isKeepLive && this.cacheData) {
        // 缓存有数据
        const { scrollTop } = this.cacheData;

        this.listview && this.listview.scrollTo(0, scrollTop);
      } else {
        // 首次进来加载数据
        this.props.isFirstLoad && this._onRefresh(false);
      }
    };

    componentWillUnmount() {
      const { isSaveListData } = this.props;
      const { dataSource, pageNumber, hasNext } = this.state;

      if (isSaveListData) {
        // if (router.action === 'PUSH' && isSaveListData) {
        const params = {
          data: dataSource._dataBlob.s1,
          scrollTop:
                    this.listview &&
                    this.listview.getInnerViewNode().parentNode.scrollTop,
          pageNumber: pageNumber,
          pageSize: this.props.pageSize,
          hasNext: hasNext
        };

        // 进入详情页 => 储存数据
        store.set('listview-cache', params);
      } else {
        store.remove('listview-cache');
      }

      
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      // 如果是内部维护，不走本钩子
      if (!nextProps.isOutDataControl) {
        return null;
      }

      const ds = new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2
      });

      let obj = {};

      if (ds.cloneWithRows(nextProps.data) !== prevState.dataSource) {
        obj.dataSource = ds.cloneWithRows(nextProps.data);
      }

      // if (nextProps.hasNext !== prevState.hasNext) {
      obj.hasNext = nextProps.hasNext;
      // }

      if (nextProps.pageNumber) {
        if (nextProps.pageNumber !== prevState.pageNumber) {
          obj.pageNumber = nextProps.pageNumber;
        }
      }

      return obj;
    }

    /**
     * 改变弹层的高度
     *
     * @memberof GListView
     */
    changeHeight = async isNullData => {
      const height = isNullData
        ? 213
        : (document.documentElement.clientWidth ||
                  document.body.clientWidth) +
              (this.listview && ReactDOM.findDOMNode(this.listview).offsetTop) +
              10; // ReactDOM.findDOMNode(this.listview).offsetTop 30

      await delay(1000);

      this.setState({
        height: height ? `${height}px` : 'auto'
      });
    };

    onScroll = e => {
      this.scrollerTop = e.scroller.getValues().top;
      this.domScroller = e;
    };

    /**
     * @param isLoadMore 是否是上拉加载，如果是，将新的数据加到原来的数据源上
     *
     * @memberof GListView
     */
    _onRefresh = (isLoadMore = false) => {
      if (isLoadMore) {
        const pageNumber = this.state.pageNumber;
        const pageSize = this.props.pageSize;

        this.props.fetchData(
          pageNumber,
          pageSize,
          isLoadMore,
          (data, checkNext) => {
            const originData = this.state.dataSource._dataBlob.s1;
            const currentData = originData.concat(data);

            this.setState(
              {
                dataSource: this.ds.cloneWithRows(currentData),
                hasNext: checkNext
              },
              () => {
              }
            );
          }
        );
      } else {
        // 注意 外部控制数据 callback 还是需要传的，防止pageNumber 不被赋值为 1开始
        const pageNumber = 1;
        const pageSize = this.props.pageSize;
        this.props.fetchData(
          pageNumber,
          pageSize,
          isLoadMore,
          (data, checkNext) => {

            this.setState(
              {
                dataSource: this.ds.cloneWithRows(data),
                hasNext: checkNext,
                pageNumber
              },
              () => {
                this._onScrollTop();
              }
            );
          }
        );
      }
    };

    _onScrollTop = () => {
      this.listview.scrollTo(0, 0);
    };

    onEndReached = () => {
      // load new data
      // hasNext: from backend data, indicates whether it is the last page, here is false
      if (!this.props.fetchData || this.props.isLoading) {
        return;
      }
      if (!this.state.hasNext) {
        return;
      }

      if (this.props.changeCategoryPageNumber) {
        this.props.changeCategoryPageNumber(this.state.pageNumber + 1); // 用于多个种类共用一个列表组件
        this._onRefresh(true);
      } else {
        this.setState(
          preState => ({ pageNumber: ++preState.pageNumber }),
          () => {
            this._onRefresh(true);
          }
        );
      }
    };

    pullToRefresh = () => {
      this._onRefresh();
    };

    scrollingComplete = () => {
      // In general, this.scrollerTop should be 0 at the end, but it may be -0.000051 in chrome61.
      if (this.scrollerTop >= -1) {
        // 隐藏完成字
        this.setState({ showFinishTxt: false });
      }
    };

    renderRow = (rowData, sectionID, rowID) => {
      const { renderRow } = this.props;
      return renderRow(rowData, sectionID, rowID);
    };

    renderSeparator = (sectionID, rowID) => {
      const { renderSeparator } = this.props;
      const { dataSource } = this.state;
      const length = dataSource._dataBlob.s1.length;

      return renderSeparator && rowID < length - 1
        ? renderSeparator(sectionID, rowID)
        : null;
    };

    renderHeader = () => {
      const { dataSource } = this.state;
      const { renderNullView, isLoading, renderHeader } = this.props;

      if (renderHeader) {
        return renderHeader();
      }

      // 加载完成后还是数据为空
      if (dataSource._cachedRowCount === 0 && !isLoading) {
        return renderNullView && renderNullView(this.state.height * 100);
      }

      return null;
    };

    renderSupport = () => {
      let component = null;

      const innerNode = this.listview && this.listview.getInnerViewNode();
      let isShow = false;

      if (innerNode) {
        const outerNode = innerNode.parentNode;

        isShow =
                innerNode.clientHeight > outerNode.clientHeight &&
                outerNode.clientHeight !== 0; // outerNode.clientHeight 有时候会为0
      }

      component = isShow ? <Text>已经到底咯~</Text> : null;

      return component;
    };

    renderFooter = () => {
      const { dataSource } = this.state;
      const { renderFooter, isHideTechSupport, isLoading } = this.props;

      const length = dataSource._dataBlob.s1.length;

      const isHideIndicator = !this.state.hasNext || length === 0;
      this.isHideIndicator = isHideIndicator;

      return (
        <FootContainer isShowFooter={this.props.renderFooter}>
          {!isHideIndicator && isLoading && (
            <Container>
              <Icon src={ICON_ACTIVITY_INDICATOR} />
            </Container>
          // <ActivityIndicator />
          )}
          {length !== 0 &&
                    !this.state.hasNext &&
                    !isHideTechSupport &&
                    this.renderSupport()}
          {renderFooter && renderFooter()}
        </FootContainer>
      );
    };

    render() {
      const { isPullToRefresh, isLoading, horizontal } = this.props;

      let pageSize;

      if (this.props.isKeepLive && this.cacheData && this.useCacheData) {
        pageSize = this.cacheData.data.length;
        this.useCacheData = false; // 只需要在第一次加载的时候使用数据长度
      } else {
        pageSize = this.props.pageSize;
      }

      return (
        <SListView
          key={this.state.useBodyScroll ? '0' : '1'}
          innerRef={ref => (this.listview = ref)}
          dataSource={this.state.dataSource}
          horizontal={horizontal}
          initialListSize={12}
          pageSize={1}
          onEndReachedThreshold={60}
          renderHeader={this.renderHeader}
          renderFooter={this.renderFooter}
          renderRow={this.renderRow}
          renderSectionBodyWrapper={this.props.renderSectionBodyWrapper}
          onScroll={this.props.onScroll}
          useBodyScroll={this.state.useBodyScroll}
          height={this.state.height}
          onEndReached={this.onEndReached}
        />
      );
    }
}
