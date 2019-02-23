/*
 * @Author: chengmx 
 * @Date: 2019-02-20 17:19:22 
 * @Last Modified by: chengmx
 * @Last Modified time: 2019-02-21 10:03:44
 * 
 * 随机获取刷新列表
 */

const data = {
    img:[
        'middle-2-2ea0cdE7bn.jpg',
        'middle-2-4ZUwh36Pvv.jpg',
        'middle-2-6YqlpDucyX.jpg',
        'middle-2-aW3ao6mJEX.jpg',
        'middle-2-BcwGoCOnXO.jpg',
        'middle-2-bnCr2N3QYN.jpg',
        'middle-2-eitSnMuTBK.jpg',
        'middle-2-g05wVXSc2L.jpg',
        'middle-2-hL3jXZhv4A.jpg',
        'middle-2-iXxuHYtDXS.jpg',
        'middle-2-jOXwBLBzOS.jpg',
        'middle-2-Lvgeq5Y1kb.jpg',
        'middle-2-PnaydXiGeQ.jpg',
        'middle-2-RQBaI10tiz.jpg',
        'middle-2-RTrVxTOLu9.jpg',
        'middle-2-vmgxgx2Mf7.jpg',
        'middle-2-w06FnSaZP6.jpg',
        'middle-2-WQYTrmT9hD.jpg',
        'middle-2-YiWgMH5WIC.jpg',
    ],
    title:[
        'S11181X',
        'S11182X',
        'S11183X',
        'S11184X',
        'S11185X',
        'S11186X',
        'S11187X',
        'S11188X'
    ],
    price:[
        23.99,
        24.99,
        25.99,
        26.99,
        27.99,
        28.99,
        29.99,
        30.99,
    ]
}

 const getProductsList = (num) => {
    if(!num){
        return []
    }

    const result = []

    for (let i = 0; i < num; i++) {
        let element = {
            img:data.img[parseInt(data.img.length * Math.random())],
            title:data.title[parseInt(data.title.length * Math.random())],
            price:data.price[parseInt(data.price.length * Math.random())]
        }

        result.push(element)
    }

    return result
}

module.exports = getProductsList

