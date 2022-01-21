const Dummy_Home = {
  myAccount: {
    imageUrl:
      "https://image.fnnews.com/resource/media/image/2021/03/15/202103151426153256_l.jpg",
  },
  list: [
    {
      type: "notice",
      user: {
        imageUrl: require("../../assets/cici/reactnative.png"),
        garde: 1,
        name: "fs",
      },
      media: [
        { url: "", name: "itda_뉴스", type: "img" },
        { url: "", name: "itda_뉴스", type: "noaction" },
        { url: "", name: "itda_뉴스", type: "mov" },
      ],
    },
    {
      type: "community",
      user: {
        imageUrl: "",
        name: "",
        garde: 2,
        create_at: "크리에이터닉네임",
      },
      media: [
        { url: "", name: "itda_뉴스", type: "img" },
        { url: "", name: "itda_뉴스", type: "mov" },
      ],
    },
  ],
  alram: true,
};

export { Dummy_Home };
