/*
 * @Author: chengmx 
 * @Date: 2019-03-04 09:58:06 
 * @Last Modified by: chengmx
 * @Last Modified time: 2019-03-04 10:41:50
 * 
 * 默认数据
 */


 //一级导航数据
 export const NavInfo = [
     {
         name:'EYEGLASSES',
         children:{
             left:[
                 {img:'https://test.firmoo.com/static/images/menglasses.jpg',name:'MEN`s GLASSES'},
                 {img:'https://test.firmoo.com/static/images/womanglasses.jpg',name:'WOMEN`s GLASSES'},
             ],
             right:[
                 {
                     title:'MATERIAL',
                     children:[
                         {name:'Metal'},
                         {name:'Acetate'},
                         {name:'TR'},
                         {name:'Titanium'},
                         {name:'Mixed'},
                         {name:'Ultem'},
                     ]
                 },
                 {
                    title:'FRAME',
                    children:[
                        {name:'Full Frame'},
                        {name:'Semi-rimless'},
                        {name:'Rimless'}
                    ]
                },
                {
                    title:'WIDTH',
                    children:[
                        {name:'Narrow'},
                        {name:'Medium'},
                        {name:'Wide'}
                    ]
                },
                {
                    title:'SHAPE',
                    children:[
                        {name:'Rectangle'},
                        {name:'Square'},
                        {name:'Aviator'},
                        {name:'Round'},
                        {name:'Oval'}
                    ]
                },
                {
                    title:'STYLE',
                    children:[
                        {name:'Kids` Glasses'},
                        {name:'Browline'},
                        {name:'Computer'},
                        {name:'Chic'}
                    ]
                },
                {
                    children:[
                        {name:'Clear'},
                        {name:'Vintage'},
                        {name:'Reading'},
                        {name:'Cat Eye'}
                    ]
                },
                {
                    children:[
                        {name:'Tortoise'},
                        {name:'Spring Hinge'},
                        {name:'Korean'},
                        {name:'Plano'},
                        {name:'Bifocals'}
                    ]
                }
             ]
         }
     },
     {
         name:'SUNGLASSES',
         children:{
             left:[
                {img:'https://test.firmoo.com/static/images/prescription.jpg',name:'SUNGLASSES'},
                {img:'https://test.firmoo.com/static/images/non-prescription.jpg',name:'POLARIZED SUNGLASSES'}
             ],
             right:[
                 {
                    children:[{name:'Aviator'}] 
                 },
                 {
                    children:[{name:'Horn Rimmed'}] 
                 },
                 {
                    children:[{name:'Retro-Vintage'}] 
                 }
             ]
         }
     },
     {
         name:'DAILY NEW'
     },
     {
         name:'BOGO SALE'
     },
     {
         name:'FEATURED STYLES',
         children:{
             left:[
                {img:'https://test.firmoo.com/static/images/designer.jpg',name:'DESIGNER EYEGLASSES'},
                {img:'https://test.firmoo.com/static/images/sports.jpg',name:'SPORTS GLASSES'}
             ],
             right:[
                 {
                    children:[{name:'Bifocals/Progressives'}] 
                 },
                 {
                    children:[{name:'Browline Glasses'}] 
                 },
                 {
                    children:[{name:'Clear Glasses'}] 
                 },
                 {
                    children:[{name:'Goggles'}] 
                 },
                 {
                    children:[{name:'Spring-hinged'}] 
                 }
             ]
         }
     }
 ]
