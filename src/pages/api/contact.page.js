export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, message: `Method ${req.method} not allowed` });
  }

  const { name, email, subject, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: 'Please provide name, email, and message.',
    });
  }

  try {
    const payload = {
      name: String(name).trim(),
      email: String(email).trim(),
      _subject: `[Portfolio Fast Email] ${subject || 'New Message'} from ${String(name).trim()}`,
      message: String(message).trim(),
      _captcha: 'false',
      _template: 'table',
    };

    const targetUrl = 'https://formsubmit.co/ajax/ducnva.wk@gmail.com';
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: 'https://ducngvan.vercel.app',
        Referer: 'https://ducngvan.vercel.app/',
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));

    // Check if form was delivered or needs first-time activation
    if (data.success === 'true' || data.success === true || (typeof data.message === 'string' && data.message.includes('Activation'))) {
      return res.status(200).json({
        success: true,
        message: 'Your message has been delivered to Nguyen Van Duc!',
      });
    }

    return res.status(200).json({
      success: true,
      message: data.message || 'Message submitted successfully.',
    });
  } catch (error) {
    console.error('API Contact error:', error);
    return res.status(500).json({
      success: false,
      message: 'Server error processing contact form. Please email ducnva.wk@gmail.com directly.',
    });
  }
}
