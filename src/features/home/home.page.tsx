import { ROUTES } from '@/shared/model/routes';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/shared/ui/accordion';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import {
  Building2,
  Camera,
  CheckCircle2,
  ChevronRight,
  Users,
} from 'lucide-react';
import { Link } from 'react-router';

function HomePage() {
  const partners = [
    { name: 'Московские гиды', icon: <Users className='h-6 w-6' /> },
    { name: 'Музей Москвы', icon: <Building2 className='h-6 w-6' /> },
    { name: 'CityTravel', icon: <CheckCircle2 className='h-6 w-6' /> },
    { name: 'Red Tours', icon: <Camera className='h-6 w-6' /> },
  ];

  const faq = [
    {
      question: 'Как выбрать экскурсию?',
      answer: 'Используйте фильтры по тематике и продолжительности',
    },
    {
      question: 'Можно ли отменить бронь?',
      answer: 'Да, за 24 часа до начала экскурсии',
    },
    {
      question: 'Есть ли групповые скидки?',
      answer: 'Да, для групп от 5 человек скидка 15%',
    },
  ];

  return (
    <main className='container mx-auto px-4'>
      {/* Hero Section */}
      <section className='py-16'>
        <div className='container text-center'>
          <Badge variant='outline' className='mb-4'>
            Экскурсии по Москве
          </Badge>
          <h1 className='text-3xl md:text-4xl font-bold mb-4'>
            Откройте Москву с местными гидами
          </h1>
          <p className='text-muted-foreground mb-8 max-w-2xl mx-auto'>
            Пешие, автобусные и тематические экскурсии по главным
            достопримечательностям столицы
          </p>
          <Button size='lg' asChild>
            <Link to={ROUTES.EXCURSIONS}>
              Выбрать экскурсию <ChevronRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </section>
      {/* Partners */}
      <section className='container py-16'>
        <h2 className='text-2xl font-bold mb-8 text-center'>Наши партнеры</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
          {partners.map((partner, index) => (
            <Card
              key={index}
              className='p-6 flex flex-col items-center gap-2 hover:bg-accent/50 transition-colors'
            >
              <div className='text-primary'>{partner.icon}</div>
              <h3 className='font-medium'>{partner.name}</h3>
            </Card>
          ))}
        </div>
      </section>
      {/* Photo Gallery */}
      <section className='py-16'>
        <div className='container'>
          <h2 className='text-2xl font-bold mb-8 text-center'>
            Московские впечатления
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
            {[
              'https://images.unsplash.com/photo-1720653540371-c1d25411c3b7',
              'https://images.unsplash.com/photo-1642318965390-1ee0da7af92f',
              'https://images.unsplash.com/photo-1693742349351-a469798b25c7',
              'https://images.unsplash.com/photo-1656542663659-f516eaf87570',
              'https://images.unsplash.com/photo-1690142706432-2861bac9e536',
              'https://images.unsplash.com/photo-1578910330150-e1ab90fc81c1',
              'https://images.unsplash.com/photo-1715436839745-d3b902803375',
              'https://images.unsplash.com/photo-1653251648164-a39e0098c9da',
            ].map((url, index) => (
              <Card key={index} className='aspect-square overflow-hidden p-0'>
                <img
                  src={url}
                  alt={`Достопримечательность Москвы ${index + 1}`}
                  className='w-full h-full object-cover hover:scale-105 transition-transform duration-300'
                  loading='lazy'
                />
              </Card>
            ))}
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section className='container py-16'>
        <h2 className='text-2xl font-bold mb-8 text-center'>Частые вопросы</h2>
        <Accordion type='single' collapsible className='mx-auto'>
          {faq.map((item, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className='text-left'>
                {item.question}
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>
    </main>
  );
}

export const Component = HomePage;
