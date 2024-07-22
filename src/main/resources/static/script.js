const paymentStart = () => {
	console.log("Payment Started");
	let amount = $("#payment_field").val();
	let name = $("#name").val();
	console.log(amount);
	if (amount == "" || amount == null || name== "" || name== null) {
		alert("Amount is required!!");
		return;
	}

	// code
	// we will use ajax to send request to server to create order

	$.ajax(
		{
			url: "/create_order",
			data: JSON.stringify({name:name , amount: amount, info: "order_request" }),
			contentType: "application/json",
			type: "POST",
			dataType: "json",
			success: function(response) {
				// invode razorpay
				console.log(response);
				if (response.status == "created") {
					// open payment form
					let options = {
						key: "rzp_test_GkajTwSfONYREd",
						amount: response.amt,
						"currency": "INR",
						"name": "Bharat Computers",
						"description": "Donation to Bharat Computers",
						"image": "https://scontent.frdp6-1.fna.fbcdn.net/v/t39.30808-6/301739775_463797132427945_1243732630347459482_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=JUAzHgZPZ0EQ7kNvgHBUJfq&_nc_ht=scontent.frdp6-1.fna&oh=00_AYBhePpPNmgTTGSdRxcXXZfrcuQLfO98MhSw9wnsGJl5JA&oe=66A2DED6",
						"order_id": response.id,
						handler: function(response) {
							console.log(response.razorpay_payment_id)
							console.log(response.razorpay_order_id)
							console.log(response.razorpay_signature)
							console.log("payment done")
							alert("Payment done 👍")
						},
						"prefill": {
							name: name,
							"email": "",
							"contact": ""
						},
						"notes": {
							"address": "Bharat Computers"

						},
						"theme": {
							"color": "#3399cc"
						}
					};
					var rzp1 = new Razorpay(options);
					rzp1.on('payment.failed', function(response) {
						alert(response.error.code);
						alert(response.error.description);
						alert(response.error.source);
						alert(response.error.step);
						alert(response.error.reason);
						alert(response.error.metadata.order_id);
						alert(response.error.metadata.payment_id);
					});

					rzp1.open();

				}
			},
			error: function(error) {
				console.log(error);
				alert("Something went wrong!!");
			},
		});
};