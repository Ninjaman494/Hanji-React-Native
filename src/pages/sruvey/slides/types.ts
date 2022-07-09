interface TextInputSlide {
  type: "input";
  name: string;
  question: string;
  required?: boolean;
}

interface CheckBoxSlide {
  type: "checkbox";
  name: string;
  question: string;
  options: { label: string; value: string }[];
  required?: boolean;
}

interface RadioBtnSlide {
  type: "radio";
  name: string;
  question: string;
  options: { label: string; value: string }[];
  required?: boolean;
}

interface IntroSlide {
  type: "intro";
  header: string;
  description: string;
}

export type Slide = TextInputSlide | CheckBoxSlide | RadioBtnSlide | IntroSlide;
