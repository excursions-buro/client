export type User = {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'USER';
  createdAt: string;
  updatedAt: string;
};

export type ExcursionType = {
  id: string;
  name: string;
};

export type ExcursionImage = {
  id: string;
  url: string;
  excursionId: string;
};

export type ScheduleSlot = {
  maxPeople: number;
  id: string;
  weekDay: number;
  time: string;
  scheduleId: string;
};

export type Schedule = {
  id: string;
  startDate: string;
  endDate: string;
  slots: ScheduleSlot[];
  excursionId: string;
  createdAt: string;
  updatedAt: string;
};

export type TicketCategory = {
  id: string;
  name: string;
  price: number;
  excursionId: string;
};

export type OrderItem = {
  id: string;
  quantity: number;
  price: number;
  orderId: string;
  ticketCategoryId: string;
};

export type Order = {
  id: string;
  totalPrice: number;
  status: 'PENDING' | 'PAID' | 'CANCELLED';
  userId: string;
  items: OrderItem[];
  createdAt: string;
  updatedAt: string;
  emailSent: boolean;
};

export type Discount = {
  id: string;
  code: string;
  value: number;
  isPercent: boolean;
  active: boolean;
  validFrom: string;
  validTo: string;
  createdAt: string;
  updatedAt: string;
};

export type Excursion = {
  id: string;
  title: string;
  description: string;
  basePrice: number;
  mainImage?: string | null;
  typeId: string;
  type: ExcursionType;
  images: ExcursionImage[];
  schedules: Schedule[];
  tickets: TicketCategory[];
  createdAt: string;
  updatedAt: string;
};

export type ExcursionFilters = {
  title?: string;
  typeId?: string;
  priceMin?: number;
  priceMax?: number;
  peopleCount?: number;
  date?: Date;
};
