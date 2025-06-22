import Article from "../../components/article/Article";
import Footer from "../../components/footer/Footer";
import Menu from "../../components/menu/Menu";

const Collaboration = () => {
  return (
    <div id="collaboration">
      <Menu />
      <Article
        blocks={[
          { type: "header", value: "Primis vulputate" },
          {
            type: "text",
            value: [
              "Amet consectetur adipiscing elit. Leo eu aenean sed diam urna tempor pulvinar. Semper vel class aptent taciti sociosqu ad litora. Mus donec rhoncus eros lobortis nulla molestie mattis. Blandit quis suspendisse aliquet nisi sodales consequat magna. Ac tincidunt nam porta elementum a enim euismod. ",
              "Cras eleifend turpis fames primis vulputate ornare sagittis. Netus suscipit auctor curabitur facilisi cubilia curae hac. Sem placerat in id cursus mi pretium tellus. Egestas iaculis massa nisl malesuada lacinia integer nunc. Orci varius natoque penatibus et magnis dis parturient. Non purus est efficitur laoreet mauris pharetra vestibulum.",
              "Proin libro feugiat tristique accumsan maecenas potenti ultricies. Sit amet consectetur adipiscing elit.",
            ],
          },
          { type: "header", value: "Feugiat tristique" },
          {
            type: "text",
            value: [
              "Lorem ipsum dolor sit amet consectetur adipiscing elit. Leo eu aenean sed diam urna tempor pulvinar. Semper vel class aptent taciti sociosqu ad litora. Mus donec rhoncus eros lobortis nulla molestie mattis. Blandit quis suspendisse aliquet nisi sodales consequat magna. Ac tincidunt nam porta elementum a enim euismod. ",
              "Dignissim velit aliquam imperdiet mollis nullam volutpat porttitor. Netus suscipit auctor curabitur facilisi cubilia curae hac. Sem placerat in id cursus mi pretium tellus. Egestas iaculis massa nisl malesuada lacinia integer nunc. Orci varius natoque penatibus et magnis dis parturient. Non purus est efficitur laoreet mauris pharetra vestibulum.",
              "Fames primis vulputate ornare sagittis vehicula praesent dui. Curabitur facilisi cubilia curae hac habitasse platea dictumst.",
            ],
          },
          { type: "header", value: "Ornare sagittis" },
          {
            type: "text",
            value: [
              "Fames primis vulputate ornare sagittis. Netus suscipit auctor curabitur facilisi cubilia curae hac. Sem placerat in id cursus mi pretium tellus. Egestas iaculis massa nisl malesuada lacinia integer nunc. Orci varius natoque penatibus et magnis dis parturient. Non purus est efficitur laoreet mauris pharetra vestibulum.",
              "Proin libero feugiat tristique accumsan maecenas potenti ultricies. Sit amet consectetur adipiscing elit.",
              "Fames primis vulputate ornare sagittis vehicula praesent dui. Curabitur facilisi cubilia curae hac habitasse platea dictumst.",
            ],
          },
        ]}
      />
      <Footer />
    </div>
  );
};

export default Collaboration;
