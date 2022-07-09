interface TextInputSlide {
  type: "input";
  question: string;
  required?: boolean;
}

interface CheckBoxSlide {
  type: "checkbox";
  question: string;
  options: { label: string; value: string }[];
  required?: boolean;
}

interface RadioBtnSlide {
  type: "radio";
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
