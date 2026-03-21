// emails/OrderConfirmation.tsx
import { Html, Body, Container, Text, Heading, Hr, Img } from '@react-email/components';

export const OrderConfirmationEmail = ({ customerName, items, orderId }) => (
  <Html>
    <Body style={{ backgroundColor: '#f9f8f6', fontFamily: 'sans-serif' }}>
      <Container style={{ backgroundColor: '#ffffff', padding: '40px', borderRadius: '12px' }}>
        <Heading style={{ color: '#444', fontSize: '24px' }}>Order Confirmed! 🥐</Heading>
        <Text>Hi {customerName}, your treats are being prepped at the shop.</Text>
        
        <Hr />
        
        <Text style={{ fontWeight: 'bold' }}>Order #{orderId.slice(0,8)}</Text>
        {items.map((item, i) => (
          <Text key={i} style={{ margin: '4px 0' }}>{item.quantity}x {item.name}</Text>
        ))}
        
        <Hr />
        
        <Text style={{ fontSize: '14px', color: '#888' }}>
          Show this email at the counter for pickup. 
          Address: 123 Pastry Lane, Sweet City.
        </Text>
      </Container>
    </Body>
  </Html>
);