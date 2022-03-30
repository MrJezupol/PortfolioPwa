//Asignar nombre y versión de la cache
const CACHE_NAME = 'v1_cache_vicente_portfolio_pwa'

//Ficheros a guardar en la cahe
var urlsToCache =[
		'./',
		'./css/styles.css',
		'./img/fondoCodigo3.jpg',
		'./img/1.png',
		'./img/2.png',
		'./img/3.png',
		'./img/4.png',
		'./img/5.png',
		'./img/6.png',
		'./img/facebook.png',
		'./img/instagram.png',
		'./img/twitter.png',
		'./img/iconoLogo-1024.png',
		'./img/iconoLogo-512.png',
		'./img/iconoLogo-384.png',
		'./img/iconoLogo-256.png',
		'./img/iconoLogo-192.png',
		'./img/iconoLogo-128.png',
		'./img/iconoLogo-96.png',
		'./img/iconoLogo-64.png',
		'./img/iconoLogo-32.png',
		'./img/iconoLogo-16.png',
		'./img/iconoLotgo.png',
		'./img/android-visual.png',
		'./img/archivo-48.png',
		'./img/linkedin-48.png',
		'./img/gmail-40.png'
		
];

//Eventos del ServiceWorker
//Instalación del serviceWorker y guardado en cache de los recursos estáticos

self.addEventListener('intall',e => {
		e.waitUntil(
			caches.open(CACHE_NAME)
					.then(cache => {
						return cache.addAll(urlsToCache)
									.then(() => {
										self.skipWaiting();
									});
					})				
					.catch(err => console.log('No se ha registrado el cache', err))
									
			);
});

//Activate
self.addEventListener('activate', e => {
	const cacheWhitelist = [CACHE_NAME];

	e.waitUntil(
		caches.keys()
				.then(cacheNames => {
					return Promise.all(
						cacheNames.map(cacheName => {

					if (cacheWhitelist.indexOf(cacheName) === -1) {
						//Borramos elementos que no necesitamos
						return caches.delete(cacheName);

					}
				})
			);
		})
		.then(() => {
			//Activar cache
			self.clients.claim();
		})
	);

});

//Fetch
self.addEventListener('fetch', e =>{
	e.respondWith(
		caches.match(e.request)
				.then(res => {
					if(res){
						//devuelvo datos desde cache
						return res;
					}

					return fetch(e.request);
				})
		);
});
