<script>
	import '../../app.css';
    import favicon from '$lib/assets/logo.webp';
	
	let { children } = $props();
</script>

<svelte:head>
    <!-- <link rel="icon" href={favicon} /> -->
	<!-- <meta http-equiv="Content-Security-Policy" content="style-src http://localhost:5173/ https://accounts.google.com/gsi/ 'nonce-xxx123'" /> -->
    <meta name="google-signin-client_id" content="1028999553685-jmt3d709j855hhvdd6e0f19gh1cdmpcv.apps.googleusercontent.com">
	<script src="https://accounts.google.com/gsi/client" async></script>
</svelte:head>

{@render children?.()}