package com.razorpay.app;

import java.util.Map;


import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;


@Controller
public class PaymentController {
	
	@Autowired
	private PaymentRepository paymentRepo;

	
	@RequestMapping("/")
	public String home() {
		return "home";
	}

	@PostMapping("/create_order")
	@ResponseBody
	public String createOrder(@RequestBody Payment pay) throws Exception {
		
		 int amt = Integer.parseInt(pay.getAmount().toString());

		RazorpayClient razorpayClient = new RazorpayClient("rzp_test_GkajTwSfONYREd"
				, "san2oOaZ6L2KHd0h4q2p4Zfi");

		JSONObject options = new JSONObject();
		options.put("amount", amt * 100); // in paise
		options.put("currency", "INR");
		options.put("receipt", "txn_123456");
		

		Order order = razorpayClient.Orders.create(options);
		
		Payment payment = new Payment();
		
	  	 
		
		payment.setAmount(order.get("amount")+"");
		payment.setOrderId(order.get("id"));
		payment.setPaymentId(null);
		payment.setStatus("Created");
		payment.setReceipt(order.get("receipt"));
		payment.setName(pay.getName());
		
		
		paymentRepo.save(payment);
		
		
		

		return order.toString();
	}
	
	
	
}
