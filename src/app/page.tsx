import { redirect } from 'next/navigation';

export default function Home() {
  // Redirect users to the login page by default
  redirect('/login');
}
