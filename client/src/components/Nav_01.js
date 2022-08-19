import logo from '../assets/img/pi.png';
import Auth from '../utils/auth';

function Nav() {
	return (
		<>
			<nav class="bg-white border-gray-200 dark:bg-gray-900">
				<div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl px-4 md:px-6 py-2.5">
					<a href="/" class="flex items-center">
						<img src={logo} class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
						<span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Pictura Online Printing</span>
					</a>
					<div class="flex items-center">
						<a href="/" class="text-sm font-medium text-blue-600 dark:text-blue-500 hover:underline">Login</a>
					</div>
				</div>
			</nav><nav class="bg-gray-50 dark:bg-gray-700">
				<div class="py-3 px-4 mx-auto max-w-screen-xl md:px-6">
					<div class="flex items-center">
						<ul class="flex flex-row mt-0 mr-6 space-x-8 text-sm font-medium">
							<li>
								<a href="/" class="text-gray-900 dark:text-white hover:underline" aria-current="page">Home</a>
							</li>
							<li>
								<a href="/" class="text-gray-900 dark:text-white hover:underline">Company</a>
							</li>
							<li>
								<a href="/" class="text-gray-900 dark:text-white hover:underline">Team</a>
							</li>
							<li>
								<a href="/" class="text-gray-900 dark:text-white hover:underline">Features</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		</>
	);
};

export default Nav;