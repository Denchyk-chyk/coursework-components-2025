import Article from "../../components/article/Article";
import Footer from "../../components/footer/Footer";
import Menu from "../../components/menu/Menu";

const ThirdNews = () => {
  return (
    <div id="third-news">
      <Menu />
      <Article
        blocks={[
          {
            type: "image",
            value: "/news/News 3.jpg",
          },
          { type: "header", value: "Donec rhoncus" },
          {
            type: "text",
            value: [
              "Sit amet consectetur adipiscing elit quisque faucibus ex. Sed diam urna tempor pulvinar vivamus fringilla lacus. Aptent taciti sociosqu ad litora torquent per conubia. Eros lobortis nulla molestie mattis scelerisque maximus eget. ",
              "Turpis fames primis vulputate ornare sagittis. Netus suscipit auctor curabitur facilisi cubilia curae hac. Sem placerat in id cursus mi pretium tellus. Egestas iaculis massa nisl malesuada lacinia integer nunc. Orci varius natoque penatibus et magnis dis parturient. Non purus est efficitur laoreet mauris pharetra vestibulum.",
              "Porta elementum a enim euismod quam justo lectus. Fames primis vulputate ornare sagittis vehicula praesent dui. Curabitur facilisi cubilia curae hac habitasse platea dictumst. Id cursus mi pretium tellus duis convallis tempus. Nisl malesuada lacinia integer nunc posuere ut hendrerit.",
            ],
          },
          {
            type: "image",
            value:
              "https://cdn.pixabay.com/photo/2016/11/22/21/33/christmas-background-1850645_1280.jpg",
          },
          { type: "header", value: "Non purus est efficitur laoreet" },
          {
            type: "text",
            value: [
              "Orci varius natoque penatibus et magnis dis parturient. Non purus est efficitur laoreet mauris pharetra vestibulum. Finibus facilisis dapibus etiam interdum tortor ligula congue. Dignissim velit aliquam imperdiet mollis nullam volutpat porttitor. Proin libero feugiat tristique accumsan maecenas potenti ultricies. Sit amet consectetur adipiscing elit quisque faucibus ex. Sed diam urna tempor pulvinar vivamus fringilla lacus. ",
            ],
          },
          {
            type: "image",
            value:
              "https://cdn.pixabay.com/photo/2020/02/02/05/10/books-4812032_1280.jpg",
          },
          { type: "header", value: "Eros lobortis nulla" },
          {
            type: "text",
            value: [
              "Orci varius natoque penatibus et magnis dis parturient. Non purus est efficitur laoreet mauris pharetra vestibulum. Finibus facilisis dapibus etiam interdum tortor ligula congue. Dignissim velit aliquam imperdiet mollis nullam volutpat porttitor. Proin libero. ",
            ],
          },
          {
            type: "image",
            value:
              "https://cdn.pixabay.com/photo/2023/11/22/15/20/books-8405721_1280.jpg",
          },
          { type: "header", value: "Aptent taciti sociosqu" },
          {
            type: "text",
            value: [
              "Leifend turpis fames primis vulputate ornare sagittis. Netus suscipit auctor curabitur facilisi cubilia curae. Proin libero feugiat tristique accumsan maecenas potenti ultricies.",
              "Hac sem placerat in id cursus mi pretium tellus. Egestas iaculis massa nisl malesuada lacinia integer nunc. Orci varius natoque penatibus et magnis dis parturient. Non purus est efficitur laoreet mauris pharetra vestibulum. Finibus facilisis dapibus etiam interdum tortor ligula congue. Dignissim velit aliquam imperdiet mollis nullam volutpat porttitor.",
            ],
          },
        ]}
      />
      <Footer />
    </div>
  );
};

export default ThirdNews;
