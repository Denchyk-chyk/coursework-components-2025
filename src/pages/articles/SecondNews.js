import Article from "../../components/article/Article";
import Footer from "../../components/footer/Footer";
import Menu from "../../components/menu/Menu";

const SecondNews = () => {
  return (
    <div id="second-news">
      <Menu />
      <Article
        blocks={[
          {
            type: "image",
            value: "/news/News 2.jpg",
          },
          { type: "header", value: "Tincidunt nam porta" },
          {
            type: "text",
            value: [
              "Cras eleifend turpis fames primis vulputate ornare sagittis. Netus suscipit auctor curabitur facilisi cubilia curae hac. Sem placerat in id cursus mi pretium tellus. Egestas iaculis massa nisl malesuada lacinia integer nunc. Orci varius natoque penatibus et magnis dis parturient. Non purus est efficitur laoreet mauris pharetra vestibulum. ",
              "Lorem ipsum dolor sit amet consectetur adipiscing elit. Leo eu aenean sed diam urna tempor pulvinar. Semper vel class aptent taciti sociosqu ad litora. Mus donec rhoncus eros lobortis nulla molestie mattis. Blandit quis suspendisse aliquet nisi sodales consequat magna. Ac tincidunt nam porta elementum a enim euismod. ",
              "Cras eleifend turpis fames primis vulputate ornare sagittis. Netus suscipit auctor curabitur facilisi cubilia curae hac. Sem placerat in id cursus mi pretium tellus. Egestas iaculis massa nisl malesuada lacinia integer nunc. Orci varius natoque penatibus et magnis dis parturient. Non purus est efficitur laoreet mauris pharetra vestibulum.",
            ],
          },
          { type: "header", value: "Cras eleifend turpis" },
          {
            type: "text",
            value: [
              "Lorem ipsum dolor sit amet consectetur adipiscing elit. Leo eu aenean sed diam urna tempor pulvinar. Semper vel class aptent taciti sociosqu ad litora. ",
              "Sed diam urna tempor pulvinar vivamus fringilla lacus. Aptent taciti sociosqu ad litora torquent per conubia. ",
              "Eros lobortis nulla molestie mattis scelerisque maximus eget. ",
              "Fames primis vulputate ornare sagittis vehicula praesent dui. Curabitur facilisi cubilia curae hac habitasse platea dictumst.",
            ],
          },
          {
            type: "image",
            value:
              "https://cdn.pixabay.com/photo/2024/02/24/20/54/books-8594725_1280.jpg",
          },
          {
            type: "text",
            value: [
              "Mus donec rhoncus eros lobortis nulla molestie mattis. Blandit quis suspendisse aliquet nisi sodales consequat magna. Ac tincidunt nam porta elementum a enim euismod. Cras eleifend turpis fames primis vulputate ornare sagittis. ",
              "Netus suscipit auctor curabitur facilisi cubilia curae hac. Sem placerat in id cursus mi pretium tellus. Egestas iaculis massa nisl malesuada lacinia integer nunc. Orci varius natoque penatibus et magnis dis parturient. Non purus est efficitur laoreet mauris pharetra vestibulum. ",
            ],
          },
        ]}
      />
      <Footer />
    </div>
  );
};

export default SecondNews;
