import React, { useState } from 'react';

const WEB = () => {
  return (
    <div>
      <h1>Welcome to My Website</h1>

      {/* Add the image */}
      <img src="https://iconscout.com/illustrations/faq" alt="Description of Image" />
    </div>
  );
}

const App = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [dropdown, setDropdown] = useState(null);

  const faqs = [
    {
      question: 'I want to track my order',
      answer:
        'To track your order, you will need to have the tracking number or order ID provided by the seller or shipping carrier. Once you have this information, you can usually track your order online by visiting the carrier’s website and entering the tracking number or order ID in the designated tracking field.',
    },
    {
      question: 'I want to manage my order',
      answer:
        'Check your order confirmation email or account: This should contain information about your order, including the expected delivery date, tracking number (if applicable), and contact information for the seller. Contact the seller: If you have any questions about your order or need to make changes, the best way to do so is to contact the seller directly. You can typically find their contact information on their website or in your order confirmation email. Check the order status: Many online retailers provide a way for you to check the status of your order online. This can give you information about when your order was shipped, when it\'s expected to arrive, and any tracking information. Make changes to your order: Depending on the seller\'s policies, you may be able to make changes to your order, such as adding or removing items, changing the shipping address, or canceling the order altogether. Contact the seller to see if this is possible.',
    },
    {
      question: 'I did not receive Instant Cashback',
      answer:
        'I\'m sorry to hear that you did not receive an instant cashback. To help you with this issue, I need more information.\n1.What type of purchase did you make?\n2.From which website or store did you make the purchase?\n3.Did you receive any confirmation or receipt for your purchase?\n4.Did you check the terms and conditions of the cashback offer before making the purchase?\n5.What type of purchase did you make?Have you contacted the website or store\'s customer support regarding the issue?',
    },
    {
      question: 'I am unable to pay using wallet',
      answer:
        'I\'m sorry to hear that you did not receive an instant cashback. To help you with this issue, I need more information.\n1.What type of purchase did you make?\n2.From which website or store did you make the purchase?\n3.Did you receive any confirmation or receipt for your purchase?\n4.Did you check the terms and conditions of the cashback offer before making the purchase?\n5.What type of purchase did you make?Have you contacted the website or store\'s customer support regarding the issue?',
    },
    {
      question: 'I want help with returns & refunds',
      answer:
        'I\'m sorry to hear that you did not receive an instant cashback. To help you with this issue, I need more information.\n1.What type of purchase did you make?\n2.From which website or store did you make the purchase?\n3.Did you receive any confirmation or receipt for your purchase?\n4.Did you check the terms and conditions of the cashback offer before making the purchase?\n5.What type of purchase did you make?Have you contacted the website or store\'s customer support regarding the issue?',
    },
  ];

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const handleDropdownToggle = (menu) => {
    setDropdown(dropdown === menu ? null : menu);
  };

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#f4f4f4', minHeight: '100vh' }}>
      {/* Navbar */}
      <nav
        style={{
          backgroundColor: '#1a1a1a',
          padding: '10px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          color: '#fff',
          transition: 'background-color 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <h1
            style={{
              margin: 0,
              color: '#ff5e00',
              fontSize: '24px',
              fontWeight: 'bold',
              transition: 'transform 0.3s ease',
            }}
          >
            ZOMO.
          </h1>
          <button
            style={{
              marginLeft: '20px',
              backgroundColor: '#ff5e00',
              color: '#fff',
              border: 'none',
              padding: '5px 15px',
              borderRadius: '20px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#e55d00')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#ff5e00')}
          >
            Location
          </button>
        </div>
        <ul style={{ display: 'flex', listStyle: 'none', margin: 0, padding: 0, gap: '20px', position: 'relative' }}></ul>
          {['Home', 'Order', 'Blog', 'Pages'].map((item, index) => (
            <ul key={index} style={{ position: 'relative' }}>
              <a
                href="#"
                style={{
                  color: '#fff',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  position: 'relative',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  transition: 'all 0.3s ease',
                  transform: dropdown === item ? 'scale(1.1)' : 'scale(1)',
                }}
                onClick={() => handleDropdownToggle(item)}
              >
                {item}
                <span style={{ marginLeft: '5px' }}>{dropdown === item ? '▲' : '▼'}</span>
              </a>
              {dropdown === item && (
                <ul
                  style={{
                    position: 'absolute',
                    top: '30px',
                    left: 0,
                    backgroundColor: '#333',
                    padding: '10px',
                    borderRadius: '5px',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    listStyle: 'none',
                    transition: 'opacity 0.3s ease',
                    opacity: dropdown === item ? 1 : 0,
                  }}
                >
                 <ul>
  {item === 'Order' && (
    <>
      <li style={{ margin: '5px 0' }}>
        <a 
          href="#" 
          style={{ color: '#ff5e00', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#ff9500'}
          onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
        >
          Menu Listing
        </a>
      </li>
      <li style={{ margin: '5px 0' }}>
        <a 
          href="#" 
          style={{ color: '#ff5e00', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#ff9500'}
          onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
        >
          Menu Grid
        </a>
      </li>
      <li style={{ margin: '5px 0' }}>
        <a 
          href="#" 
          style={{ color: '#ff5e00', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#ff9500'}
          onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
        >
          Address
        </a>
      </li>
      <li style={{ margin: '5px 0' }}>
        <a 
          href="#" 
          style={{ color: '#ff5e00', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#ff9500'}
          onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
        >
          Checkout
        </a>
      </li>
      <li style={{ margin: '5px 0' }}>
        <a 
          href="#" 
          style={{ color: '#ff5e00', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#ff9500'}
          onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
        >
          Confirm Order
        </a>
      </li>
      <li style={{ margin: '5px 0' }}>
        <a 
          href="#" 
          style={{ color: '#ff5e00', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#ff9500'}
          onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
        >
          Offer
        </a>
      </li>
      <li style={{ margin: '5px 0' }}>
        <a 
          href="#" 
          style={{ color: '#ff5e00', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#ff9500'}
          onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
        >
          Order Tracking
        </a>
      </li>
      <li style={{ margin: '5px 0' }}>
        <a 
          href="#" 
          style={{ color: '#ff5e00', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#ff9500'}
          onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
        >
          Payment
        </a>
      </li>
      <li style={{ margin: '5px 0' }}>
        <a 
          href="#" 
          style={{ color: '#ff5e00', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#ff9500'}
          onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
        >
          Restaurant Listing
        </a>
      </li>
    </>
  )}

  {item === 'Home' && (
    <>
      <li style={{ margin: '5px 0' }}>
        <a 
          href="#" 
          style={{ color: '#ff5e00', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#ff9500'}
          onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
        >
          Classic
        </a>
      </li>
      <li style={{ margin: '5px 0' }}>
        <a 
          href="#" 
          style={{ color: '#ff5e00', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#ff9500'}
          onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
        >
          Elegance
        </a>
      </li>
      <li style={{ margin: '5px 0' }}>
        <a 
          href="#" 
          style={{ color: '#ff5e00', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#ff9500'}
          onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
        >
          Compact
        </a>
      </li>
      <li style={{ margin: '5px 0' }}>
        <a 
          href="#" 
          style={{ color: '#ff5e00', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#ff9500'}
          onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
        >
          Minimal
        </a>
      </li>
      <li style={{ margin: '5px 0' }}>
        <a 
          href="#" 
          style={{ color: '#ff5e00', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#ff9500'}
          onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
        >
          Modern
        </a>
      </li>
    </>
  )}

  {item === 'Blog' && (
    <>
      <li style={{ margin: '5px 0' }}>
        <a 
          href="#" 
          style={{ color: '#ff5e00', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#ff9500'}
          onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
        >
          Grid Left Sidebar
        </a>
      </li>
      <li style={{ margin: '5px 0' }}>
        <a 
          href="#" 
          style={{ color: '#ff5e00', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#ff9500'}
          onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
        >
          Grid Right Sidebar
        </a>
      </li>
      <li style={{ margin: '5px 0' }}>
        <a 
          href="#" 
          style={{ color: '#ff5e00', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#ff9500'}
          onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
        >
          Blog Listing
        </a>
      </li>
      <li style={{ margin: '5px 0' }}>
        <a 
          href="#" 
          style={{ color: '#ff5e00', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#ff9500'}
          onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
        >
          Blog Details
        </a>
      </li>
    </>
  )}

  {item === 'Pages' && (
    <>
      <li style={{ margin: '5px 0' }}>
        <a 
          href="#" 
          style={{ color: '#ff5e00', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#ff9500'}
          onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
        >
          404
        </a>
      </li>
      <li style={{ margin: '5px 0' }}>
        <a 
          href="#" 
          style={{ color: '#ff5e00', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#ff9500'}
          onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
        >
          Coming Soon
        </a>
      </li>
      <li style={{ margin: '5px 0' }}>
        <a 
          href="#" 
          style={{ color: '#ff5e00', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#ff9500'}
          onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
        >
          Contact
        </a>
      </li>
      <li style={{ margin: '5px 0' }}>
      <a 
          href="#" 
          style={{ color: '#ff5e00', textDecoration: 'none' }}
          onMouseEnter={(e) => e.target.style.color = '#ff9500'}
          onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
        >
          Minimal
        </a>
      </li>
    </>
  )}

  {item === 'Blog' && (
    <li style={{ margin: '5px 0' }}>
      <a
        href="#"
        style={{ color: '#ff5e00', textDecoration: 'none' }}
        onMouseEnter={(e) => e.target.style.color = '#ff9500'}
        onMouseLeave={(e) => e.target.style.color = '#ff5e00'}
      >
        Latest Posts
      </a>
    </li>
  )}
</ul>
              )}
            </ul>
          ))}
        </ul>
      </nav>

      {/* FAQ Accordion Section */}
      <div style={{ padding: '20px' }}>
        <h2 style={{ color: '#333', marginBottom: '20px' }}>FAQs</h2>
        {faqs.map((faq, index) => (
          <div key={index} style={{ marginBottom: '15px' }}>
            <div
              onClick={() => handleToggle(index)}
              style={{
                padding: '15px',
                backgroundColor: '#fff',
                border: '1px solid #ddd',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                color: '#333',
                boxShadow: activeIndex === index ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
              }}
            >
              {faq.question}
            </div>
            {activeIndex === index && (
              <div
                style={{
                  padding: '15px',
                  backgroundColor: '#f9f9f9',
                  border: '1px solid #ddd',
                  borderTop: 'none',
                  borderRadius: '5px',
                  marginTop: '5px',
                }}
              >
                <p style={{ color: '#555' }}>{faq.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;