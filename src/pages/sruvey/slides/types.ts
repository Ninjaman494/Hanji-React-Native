export interface RadioOption {
  title: string;
  description: string;
  value: string;
}

interface TextInputSlide {
  type: "input";
  name: string;
  question: string;
  required?: boolean;
}

interface RadioBtnSlide {
  type: "radio";
  name: string;
  question: string;
  options: RadioOption[];
  required?: boolean;
}

interface IntroSlide {
  type: "intro";
  header: string;
  description: string;
}

export type Slide = TextInputSlide | RadioBtnSlide | IntroSlide;
