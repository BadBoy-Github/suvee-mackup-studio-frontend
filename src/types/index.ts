export interface Service {
  _id: string;
  name: string;
  description: string;
  category: string;
  price?: string;
  image: string;
  isHD?: boolean;
  isTop?: boolean;
  createdAt: string;
}

export interface Work {
  _id: string;
  customerName: string;
  photos: string[];
  description: string;
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
