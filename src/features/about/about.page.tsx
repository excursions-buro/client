import { ROUTES } from '@/shared/model/routes';
import { Badge } from '@/shared/ui/badge';
import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';
import { CheckCircle2, Globe, History, Map, Users } from 'lucide-react';
import { Link } from 'react-router';

export function AboutPage() {
  const teamMembers = [
    {
      name: 'Анна Петрова',
      role: 'Основатель & гид',
      experience: '8 лет',
      photo:
        'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&crop=faces',
    },
    {
      name: 'Иван Сидоров',
      role: 'Главный гид',
      experience: '12 лет',
      photo:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&crop=faces',
    },
    {
      name: 'Мария Иванова',
      role: 'Менеджер экскурсий',
      experience: '5 лет',
      photo:
        'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&crop=faces',
    },
    {
      name: 'Дмитрий Козлов',
      role: 'Разработчик маршрутов',
      experience: '7 лет',
      photo:
        'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&crop=faces',
    },
  ];

  const values = [
    {
      icon: <Globe className='h-8 w-8' />,
      title: 'Любовь к Москве',
      description: 'Показываем город с любовью и знанием всех его тайн',
    },
    {
      icon: <Users className='h-8 w-8' />,
      title: 'Индивидуальный подход',
      description: 'Создаем экскурсии под интересы каждого гостя',
    },
    {
      icon: <CheckCircle2 className='h-8 w-8' />,
      title: 'Профессионализм',
      description: 'Все гиды проходят строгий отбор и обучение',
    },
    {
      icon: <Map className='h-8 w-8' />,
      title: 'Авторские маршруты',
      description: 'Уникальные программы, которых нет у других',
    },
  ];

  return (
    <main className='container mx-auto px-4 py-12'>
      {/* Hero Section */}
      <section className='py-12 md:py-16'>
        <div className='text-center max-w-3xl mx-auto'>
          <Badge variant='outline' className='mb-4'>
            О нашем проекте
          </Badge>
          <h1 className='text-3xl md:text-4xl font-bold mb-6'>
            Знакомьтесь с командой, которая открывает Москву
          </h1>
          <p className='text-muted-foreground mb-8 text-lg'>
            Мы - группа профессиональных гидов и энтузиастов, влюбленных в
            Москву. Наша миссия - показать вам настоящую столицу через истории
            людей, архитектуру и необычные места.
          </p>
          <div className='flex justify-center gap-4'>
            <Button asChild>
              <Link to={ROUTES.EXCURSIONS}>Выбрать экскурсию</Link>
            </Button>
            <Button variant='outline' asChild>
              <a href='mailto:info@mosgid.ru'>Связаться с нами</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className='py-16'>
        <div className='text-center mb-12'>
          <h2 className='text-2xl md:text-3xl font-bold mb-4'>Наша команда</h2>
          <p className='text-muted-foreground max-w-2xl mx-auto'>
            Профессиональные гиды с глубокими знаниями истории и культуры Москвы
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {teamMembers.map((member, index) => (
            <Card
              key={index}
              className='p-6 text-center hover:shadow-lg transition-shadow'
            >
              <div className='overflow-hidden rounded-full w-32 h-32 mx-auto mb-4 border-4 border-primary/10'>
                <img
                  src={member.photo}
                  alt={member.name}
                  className='w-full h-full object-cover'
                  loading='lazy'
                />
              </div>
              <h3 className='text-xl font-semibold'>{member.name}</h3>
              <p className='text-muted-foreground mb-2'>{member.role}</p>
              <div className='flex items-center justify-center text-sm text-primary'>
                <History className='mr-2 h-4 w-4' />
                <span>Опыт: {member.experience}</span>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className='py-16 bg-muted/50 rounded-2xl px-4'>
        <div className='container'>
          <div className='text-center mb-12'>
            <h2 className='text-2xl md:text-3xl font-bold mb-4'>
              Наши ценности
            </h2>
            <p className='text-muted-foreground max-w-2xl mx-auto'>
              Принципы, которые лежат в основе каждой нашей экскурсии
            </p>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
            {values.map((value, index) => (
              <div key={index} className='text-center'>
                <div className='mx-auto mb-4 text-primary bg-primary/10 p-3 rounded-full w-16 h-16 flex items-center justify-center'>
                  {value.icon}
                </div>
                <h3 className='text-xl font-semibold mb-2'>{value.title}</h3>
                <p className='text-muted-foreground'>{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className='py-16'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
          <div>
            <h2 className='text-2xl md:text-3xl font-bold mb-6'>
              Наша история
            </h2>
            <div className='space-y-4 text-muted-foreground'>
              <p>
                Проект начался в 2015 году с небольших пеших экскурсий по
                историческому центру Москвы. Анна, основатель проекта, будучи
                историком по образованию, хотела показать москвичам и гостям
                столицы город с нового ракурса.
              </p>
              <p>
                За 8 лет мы выросли в команду из 15 профессиональных гидов,
                разработали более 50 уникальных маршрутов и провели экскурсии
                для 20 000 гостей.
              </p>
              <p>
                Сегодня мы предлагаем не только классические обзорные экскурсии,
                но и тематические программы: гастрономические туры,
                архитектурные прогулки, экскурсии по московскому метро и многое
                другое.
              </p>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4'>
            <div className='overflow-hidden rounded-xl w-full h-72'>
              <img
                src='https://images.unsplash.com/photo-1596484552834-6a58f850e0a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=720'
                alt='Историческая Москва'
                className='w-full h-full object-cover'
                loading='lazy'
              />
            </div>
            <div className='overflow-hidden rounded-xl w-full h-72 mt-8'>
              <img
                src='https://images.unsplash.com/photo-1513326738677-b964603b136d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=720'
                alt='Современная Москва'
                className='w-full h-full object-cover'
                loading='lazy'
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className='py-16 text-center'>
        <div className='bg-primary/5 rounded-2xl py-16 px-4 max-w-4xl mx-auto'>
          <h2 className='text-2xl md:text-3xl font-bold mb-6'>
            Готовы открыть для себя настоящую Москву?
          </h2>
          <p className='text-muted-foreground mb-8 max-w-2xl mx-auto'>
            Присоединяйтесь к одной из наших экскурсий или закажите
            индивидуальный тур
          </p>
          <Button size='lg' asChild>
            <Link to={ROUTES.EXCURSIONS}>Посмотреть все экскурсии</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

export const Component = AboutPage;
