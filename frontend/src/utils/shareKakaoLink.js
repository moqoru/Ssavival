export const shareKakao = () => {
  // url이 id값에 따라 변경되기 때문에 route를 인자값으로 받아줌
  if (window.Kakao) {
    const kakao = window.Kakao;
    if (!kakao.isInitialized()) {
      kakao.init("javascript_key"); // 카카오에서 제공받은 javascript key를 넣어줌 -> .env파일에서 호출시킴
    }
    kakao.Link.sendCustom({
      templateId: "templateId",
    });
  }
};
