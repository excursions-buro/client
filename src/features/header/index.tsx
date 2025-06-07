import { ROUTES } from '@/shared/model/routes';
import { useSession } from '@/shared/model/session';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/shared/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shared/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/ui/sheet';

import {
  ChevronDown,
  LogOut,
  Menu,
  Settings,
  ShoppingCart,
  Star,
  User,
} from 'lucide-react';

export function AppHeader() {
  const navigate = useNavigate();
  const { session, logout } = useSession();
  const isAuth = Boolean(session);
  const [currency, setCurrency] = useState('RUB');

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.LOGIN);
  };

  const navItems = [
    { label: 'Главная', to: ROUTES.HOME },
    { label: 'Экскурсии', to: ROUTES.EXCURSIONS },
    { label: 'О нас', to: ROUTES.ABOUT },
  ];

  return (
    <header className='sticky top-0 z-50 p-4 bg-background dark:bg-background border-b'>
      <div className='container mx-auto'>
        <div className='flex items-center justify-between'>
          <Link to={ROUTES.HOME} className='flex items-center gap-2'>
            <Star className='h-5 w-5 text-primary' />
            <span className='text-lg font-semibold'>ExcBuro</span>
          </Link>

          {/* Навигация — десктоп */}
          <nav className='hidden md:flex items-center gap-6'>
            {navItems.map(({ label, to }) => (
              <Button key={to} asChild variant='ghost'>
                <Link to={to}>{label}</Link>
              </Button>
            ))}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='gap-1'>
                  {currency}
                  <ChevronDown className='h-4 w-4 opacity-50' />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {['RUB', 'USD', 'EUR'].map((curr) => (
                  <DropdownMenuItem
                    key={curr}
                    onClick={() => setCurrency(curr)}
                    className={curr === currency ? 'bg-accent' : ''}
                  >
                    {curr}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {isAuth ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant='outline' className='gap-2'>
                    <User className='h-4 w-4' />
                    {session?.user?.name ? (
                      <span className='hidden sm:inline'>
                        {session.user.name}
                      </span>
                    ) : (
                      <span className='hidden sm:inline'>Профиль</span>
                    )}
                    <ChevronDown className='h-4 w-4 opacity-50' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end'>
                  <DropdownMenuItem asChild>
                    <Link to={ROUTES.ORDERS} className='gap-2'>
                      <ShoppingCart className='h-4 w-4' /> Мои заказы
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={ROUTES.PROFILE} className='gap-2'>
                      <User className='h-4 w-4' /> Профиль
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={ROUTES.SETTINGS} className='gap-2'>
                      <Settings className='h-4 w-4' /> Настройки
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className='text-destructive cursor-pointer'
                    onClick={handleLogout}
                  >
                    <LogOut className='h-4 w-4 mr-2' /> Выйти
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant='outline'>
                <Link to={ROUTES.LOGIN} className='gap-2'>
                  <User className='h-4 w-4' /> Войти
                </Link>
              </Button>
            )}
          </nav>

          {/* Мобильное меню */}
          <div className='md:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant='ghost' size='icon'>
                  <Menu className='h-5 w-5' />
                </Button>
              </SheetTrigger>
              <SheetContent side='left' className='p-4'>
                <SheetHeader>
                  <SheetTitle className='flex items-center gap-2'>
                    <Star className='h-5 w-5 text-primary' /> ExcBuro
                  </SheetTitle>
                </SheetHeader>

                <div className='mt-4 flex flex-col gap-4'>
                  {navItems.map(({ label, to }) => (
                    <Button
                      key={to}
                      asChild
                      variant='ghost'
                      className='justify-start'
                    >
                      <Link to={to}>{label}</Link>
                    </Button>
                  ))}

                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Валюта' />
                    </SelectTrigger>
                    <SelectContent>
                      {['RUB', 'USD', 'EUR'].map((curr) => (
                        <SelectItem key={curr} value={curr}>
                          {curr}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className='pt-4 border-t'>
                    {isAuth ? (
                      <div className='flex flex-col gap-2'>
                        <Button
                          asChild
                          variant='ghost'
                          className='justify-start'
                        >
                          <Link to={ROUTES.ORDERS}>
                            <ShoppingCart className='h-4 w-4 mr-2' /> Заказы
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant='ghost'
                          className='justify-start'
                        >
                          <Link to={ROUTES.SETTINGS}>
                            <Settings className='h-4 w-4 mr-2' /> Настройки
                          </Link>
                        </Button>
                        <Button
                          variant='ghost'
                          className='text-destructive justify-start'
                          onClick={handleLogout}
                        >
                          <LogOut className='h-4 w-4 mr-2' /> Выйти
                        </Button>
                      </div>
                    ) : (
                      <Button asChild variant='outline' className='w-full'>
                        <Link
                          to={ROUTES.LOGIN}
                          className='gap-2 justify-center'
                        >
                          <User className='h-4 w-4' /> Войти
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
