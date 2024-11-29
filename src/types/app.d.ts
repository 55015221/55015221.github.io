interface Image {
  id: number;
  title: string;
  url: string;
}

interface Card {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  content: string;
  thumbnail: string;
  icon: string;
  created_at: string;
  images: Array<Image>;
  badge: Array<string>;
}
