/*
이메일 주소는 localPart@domain.TopLevelDomain 형식으로 구성
로컬 파트(localPart)는 반드시 알파벳 또는 숫자로 시작
at('@') 기호 반드시 포함
도메인 파트는 반드시 알파벳으로 시작
dot('.') 기호 반드시 포함
최상위 도메인(TopLevelDomain)은 반드시 최소 2개 이상 3개 이하의 알파벳이나 숫자로 구성
*/

export const validateEmail = (email) => {
  const regex =
    /^[0-9?A-z0-9?]+(\.)?[0-9?A-z0-9?]+@[0-9?A-z]+\.[A-z]{2}.?[A-z]{0,3}$/;
  return regex.test(email);
};

export const removeWhitespace = (text) => {
  const regex = /\s/g;
  return text.replace(regex, "");
};
