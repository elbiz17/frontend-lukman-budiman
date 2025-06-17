
import { User } from 'lucide-react'
import { Link } from 'react-router'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'

export default function Navbar() {
  return (
    <header className="py-2 px-0 flex justify-between mb-8 md:mb-10">
      <Link to={'/'} className="flex items-center gap-2">
        <div className="bg-gradient-to-br from-blue-500 via-sky-200 to-blue-500 p-2 rounded-lg text-secondary">
          <User />
        </div>
        <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-500 via-sky-400 to-blue-500">Frontend Developer</h1>
      </Link>
      <nav className='md:block hidden'>
        <ul className="flex gap-8 items-center">
          {["Profile"].map((item, index) => (
            <li className="hover:text-primary active:text-primary flex items-center" key={index}>
              {item == "Profile" ?
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className='bg-transparent flex items-center gap-2 cursor-pointer border-none outline-none'>
                      <div className='text-blue-500 font-medium'>Lukman Budiman</div>
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <Link to={'/profile'}>
                      <DropdownMenuItem className='cursor-pointer'>
                        Profile
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuItem className='cursor-pointer' onClick={() => { }}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu> :
                <Link to={'/'}>
                  {item}
                </Link>
              }
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
