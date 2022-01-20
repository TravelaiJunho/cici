const Dummy_Home = {
    myAccount: {
        imageUrl:'https://image.fnnews.com/resource/media/image/2021/03/15/202103151426153256_l.jpg'
    },
    list: [
        {
            type: 'feed',
            user:{
                imageUrl:'',
                garde:1,
                name:""
            },
            media:[
                {url:'',name:'itda_뉴스', type:'img'},
                {url:'',name:'itda_뉴스', type:'mov'}

            ],

        },
        {
            type: 'fromCreator',
            user:{
                imageUrl:'',
                name:'',
                garde:2,
                create_at:'크리에이터닉네임',
            },
            media:[
                {url:'',name:'itda_뉴스', type:'img'},
                {url:'',name:'itda_뉴스', type:'mov'}

            ],

        },
        {
            type:"recommendCreator",
            create_time:"",
            news_title:"",
            news_contents:"",
            from_creator:[
                {
                    imageUrl:"",
                    user:{
                        imageUrl:'',
                        garde:1,
                        name:""
                    }
                },

            ]
        },
        {
            type:"recommendCreator",
            create_time:"",
            news_title:"",
            news_contents:"",
            from_creator:[
                {
                    imageUrl:"",
                    user:{
                        imageUrl:'',
                        garde:1,
                        name:""
                    }
                },

            ]
        },

    ],
    alram:true

}

export {
    Dummy_Home
}
