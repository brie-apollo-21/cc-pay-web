<script>
	import '../../app.css';
    import favicon from '$lib/assets/logo.webp';
	
	let { children } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
	<!-- <meta http-equiv="Content-Security-Policy" content="style-src http://localhost:5173/ https://accounts.google.com/gsi/ 'nonce-xxx123'" /> -->
</svelte:head>

{@render children?.()}