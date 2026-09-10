export interface Service {
  _id: string;
  title: string;
  subtitle: string;
  price: string;
  description?: string;
  incl?: string;
  heroImage?: string;
  createdAt: string;
}

export interface Work {
  _id: string;
  groomName: string;
  brideName: string;
  img1?: string;
  img2?: string;
  img3?: string;
  img4?: string;
  createdAt: string;
}

export interface Review {
  _id: string;
  customerName: string;
  rating: number;
  comment: string;
  photo?: string;
  createdAt: string;
}

export interface ContactForm {
  name: string;
  email: string;
  phone: string;
  context: string;
  message: string;
}
