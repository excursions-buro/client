import { ROUTES } from '@/shared/model/routes';
import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Star,
  Twitter,
} from 'lucide-react';
import { Link } from 'react-router';

export function AppFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-background dark:bg-background mt-20 border-t py-12 px-4'>
      <div className='container mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8'>
          {/* Лого и описание */}
          <div className='space-y-4'>
            <Link to={ROUTES.HOME} className='flex items-center gap-2'>
              <Star className='h-5 w-5 text-primary' />
              <span className='text-lg font-semibold'>ExcBuro</span>
            </Link>
            <p className='text-muted-foreground'>
              Экскурсии по Москве от местных гидов. Откройте для себя столицу с
              новой стороны.
            </p>
            <div className='flex gap-3'>
              <Button variant='outline' size='icon' asChild>
                <a
                  href='https://instagram.com'
                  target='_blank'
                  rel='noreferrer'
                >
                  <Instagram className='h-4 w-4' />
                </a>
              </Button>
              <Button variant='outline' size='icon' asChild>
                <a href='https://facebook.com' target='_blank' rel='noreferrer'>
                  <Facebook className='h-4 w-4' />
                </a>
              </Button>
              <Button variant='outline' size='icon' asChild>
                <a href='https://twitter.com' target='_blank' rel='noreferrer'>
                  <Twitter className='h-4 w-4' />
                </a>
              </Button>
            </div>
          </div>

          {/* Навигация */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Навигация</h3>
            <ul className='space-y-2'>
              <li>
                <Button asChild variant='ghost' className='justify-start px-0'>
                  <Link to={ROUTES.HOME}>Главная</Link>
                </Button>
              </li>
              <li>
                <Button asChild variant='ghost' className='justify-start px-0'>
                  <Link to={ROUTES.EXCURSIONS}>Экскурсии</Link>
                </Button>
              </li>
              <li>
                <Button asChild variant='ghost' className='justify-start px-0'>
                  <Link to={ROUTES.ABOUT}>О нас</Link>
                </Button>
              </li>
              <li>
                <Button asChild variant='ghost' className='justify-start px-0'>
                  <Link to={ROUTES.CONTACTS}>Контакты</Link>
                </Button>
              </li>
            </ul>
          </div>

          {/* Контакты */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Контакты</h3>
            <ul className='space-y-3'>
              <li className='flex items-center gap-2 text-muted-foreground'>
                <Phone className='h-4 w-4' />
                <a href='tel:+74951234567'>+7 (495) 123-45-67</a>
              </li>
              <li className='flex items-center gap-2 text-muted-foreground'>
                <Mail className='h-4 w-4' />
                <a href='mailto:info@excburo.ru'>info@excburo.ru</a>
              </li>
              <li className='flex items-start gap-2 text-muted-foreground'>
                <MapPin className='h-4 w-4 mt-0.5' />
                <span>г. Москва, ул. Тверская, д. 10, офис 25</span>
              </li>
            </ul>
          </div>

          {/* Подписка */}
          <div>
            <h3 className='text-lg font-semibold mb-4'>Подписка</h3>
            <p className='text-muted-foreground mb-3'>
              Узнавайте первыми о новых экскурсиях и акциях
            </p>
            <div className='flex gap-2'>
              <input
                type='email'
                placeholder='Ваш email'
                className='flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
              />
              <Button size='sm'>ОК</Button>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className='pt-8 border-t flex flex-col md:flex-row justify-between items-center gap-4'>
          <div className='text-sm text-muted-foreground'>
            © {currentYear} ExcBuro. Все права защищены.
          </div>

          <div className='flex items-center gap-4 flex-wrap'>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant='ghost'
                  size='sm'
                  className='text-muted-foreground'
                >
                  Валюта: RUB
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>RUB</DropdownMenuItem>
                <DropdownMenuItem>USD</DropdownMenuItem>
                <DropdownMenuItem>EUR</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant='ghost' size='sm' asChild>
              <Link to={ROUTES.PRIVACY}>Политика конфиденциальности</Link>
            </Button>

            <Button variant='ghost' size='sm' asChild>
              <Link to={ROUTES.TERMS}>Пользовательское соглашение</Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
