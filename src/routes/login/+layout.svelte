<script>
	import '../../app.css';
	
	let { children } = $props();
</script>

<svelte:head>
	<!-- <meta http-equiv="Content-Security-Policy" content="style-src http://localhost:5173/ https://accounts.google.com/gsi/ 'nonce-xxx123'" /> -->
</svelte:head>

{@render children?.()}