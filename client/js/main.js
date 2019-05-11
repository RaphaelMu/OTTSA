var app = new Vue({
	el: '#app',
	data: {
		text: null,
		tts: null
	},
	methods: {
		onSubmit() {
			if (this.text) {
				let url = 'http://localhost:8080?text=' + encodeURIComponent(this.text)
				
				let player = this.$refs.player

				axios.get(url).then(response => {
					this.tts = response.data
					
					player.load
				})
			}
		}
	}
})  
