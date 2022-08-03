export interface RadioOption {
  title: string;
  description: string;
  value: string;
}

export interface TextInputSlide {
  type: "input";
  name: string;
  question: string;
}

export interface RadioBtnSlide {
  type: "radio";
  name: string;
  question: string;
  options: RadioOption[];
}

export interface IntroSlide {
  type: "intro";
  header: string;
  description: string;
}

export interface FinalSlide {
  type: "final";
}

export type Slide = TextInputSlide | RadioBtnSlide | IntroSlide | FinalSlide;
