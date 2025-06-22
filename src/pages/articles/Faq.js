import Article from "../../components/article/Article";
import Footer from "../../components/footer/Footer";
import Menu from "../../components/menu/Menu";

const Faq = () => {
  return (
    <div id="faq">
      <Menu />
      <Article
        blocks={[
          { type: "header", value: "Mus donec rhoncus" },
          {
            type: "text",
            value: [
              "Lorem ipsum dolor sit amet consectetur adipiscing elit. Leo eu aenean sed diam urna tempor pulvinar. Semper vel class aptent taciti sociosqu ad litora. Mus donec rhoncus eros lobortis nulla molestie mattis. Blandit quis suspendisse aliquet nisi sodales consequat magna. Ac tincidunt nam porta elementum a enim euismod. ",
              "Cras eleifend turpis fames primis vulputate ornare sagittis. Netus suscipit auctor curabitur facilisi cubilia curae hac. Sem placerat in id cursus mi pretium tellus. Egestas iaculis massa nisl malesuada lacinia integer nunc. Orci varius natoque penatibus et magnis dis parturient. Non purus est efficitur laoreet mauris pharetra vestibulum.",
            ],
          },
          { type: "header", value: "Cras eleifend turpis" },
          {
            type: "text",
            value: [
              "Sed diam urna tempor pulvinar vivamus fringilla lacus. Aptent taciti sociosqu ad litora torquent per conubia. ",
              "Eros lobortis nulla molestie mattis scelerisque maximus eget. ",
              "Fames primis vulputate ornare sagittis vehicula praesent dui. Curabitur facilisi cubilia curae hac habitasse platea dictumst.",
            ],
          },
          { type: "header", value: "Finibus facilisis" },
          {
            type: "text",
            value: [
              "Orci varius natoque penatibus et magnis dis parturient. Non purus est efficitur laoreet mauris pharetra vestibulum. Finibus facilisis dapibus etiam interdum tortor ligula congue. Dignissim velit aliquam imperdiet mollis nullam volutpat porttitor. Proin libero feugiat tristique accumsan maecenas potenti ultricies. Sit amet consectetur adipiscing elit quisque faucibus ex. Sed diam urna tempor pulvinar vivamus fringilla lacus. ",
            ],
          },
          { type: "header", value: "Porta elementum" },
          {
            type: "text",
            value: [
              "Mus donec rhoncus eros lobortis nulla molestie mattis. Blandit quis suspendisse aliquet nisi sodales consequat magna. Ac tincidunt nam porta elementum a enim euismod. Cras eleifend turpis fames primis vulputate ornare sagittis. ",
              "Netus suscipit auctor curabitur facilisi cubilia curae hac. Sem placerat in id cursus mi pretium tellus. Egestas iaculis massa nisl malesuada lacinia integer nunc. Orci varius natoque penatibus et magnis dis parturient. Non purus est efficitur laoreet mauris pharetra vestibulum. ",
            ],
          },
          { type: "header", value: "Cras eleifend" },
          {
            type: "text",
            value: [
              "Eros lobortis nulla molestie mattis scelerisque maximus eget. Aliquet nisi sodales consequat magna ante condimentum neque. Porta elementum a enim euismod quam justo lectus. Fames primis vulputate ornare sagittis vehicula praesent dui. Curabitur facilisi cubilia curae hac habitasse platea dictumst. Id cursus mi pretium tellus duis convallis tempus. Nisl malesuada lacinia integer nunc posuere ut hendrerit.",
            ],
          },
        ]}
      />
      <Footer />
    </div>
  );
};

export default Faq;
