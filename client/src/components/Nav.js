import { Link } from 'react-router-dom';
import logo from '../assets/img/pi.png';
import Auth from '../utils/auth';

function Nav() {
	
	const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

	let user;

	if(Auth.loggedIn()) {
		user = Auth.getProfile().data.firstname 
	}
	return (
		<>
			<nav className="bg-white border-gray-200 dark:bg-gray-900">
				<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-6">
					<Link to="/" className="flex items-center">
						<img src={logo} className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
						<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Pictura Online Printing</span>
					</Link>
					<div className="flex items-center">
						{Auth.loggedIn() ? (
						<>
						<span className='text-white'>{user} -</span>
						<Link to="/" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline" onClick={logout}>&nbsp;Sign out</Link>
						</>
						): 
						<Link to="/login" className="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">Sign in</Link>
						
						}
					</div>
				</div>
			</nav><nav className="bg-gray-50 dark:bg-gray-700">
				<div className="py-6 px-4 mx-auto max-w-screen-xl md:px-6">
					<div className="flex items-center">
						<ul className="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
							<li>
								<Link to="/" className="text-gray-900 dark:text-white hover:underline" aria-current="page">Dashboard</Link>
							</li>
							<li>
								<Link to="/pictures" className="text-gray-900 dark:text-white hover:underline">Pictures</Link>
							</li>
							<li>
								<Link to="/" className="text-gray-900 dark:text-white hover:underline">Contact Us</Link>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Nav;