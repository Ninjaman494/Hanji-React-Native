export interface RadioOption {
  title: string;
  description: string;
  value: string;
}

export interface TextInputSlide {
  type: "input";
  name: string;
  question: string;
  required?: boolean;
}

export interface RadioBtnSlide {
  type: "radio";
  name: string;
  question: string;
  options: RadioOption[];
  required?: boolean;
}

export interface IntroSlide {
  type: "intro";
  header: string;
  description: string;
}

export type Slide = TextInputSlide | RadioBtnSlide | IntroSlide;
