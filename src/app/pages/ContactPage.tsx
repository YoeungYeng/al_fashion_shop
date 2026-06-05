import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Youtube, Send, CheckCircle } from 'lucide-react';
import { useLang } from '../context/LanguageContext';

const socials = [
  { icon: Facebook,  href: 'https://facebook.com',   label: 'Facebook',  color: '#1877F2' },
  { icon: Send,      href: 'https://t.me/yourcafe',  label: 'Telegram',  color: '#229ED9' },
  { icon: Instagram, href: 'https://instagram.com',  label: 'Instagram', color: '#E1306C' },
  { icon: Youtube,   href: 'https://youtube.com',    label: 'YouTube',   color: '#FF0000' },
];

const hours = [
  { dayKey: 'contact.weekdays', time: '8:00 – 18:00', open: true },
  { dayKey: 'contact.saturday', time: '8:00 – 17:00', open: true },
  { dayKey: 'contact.sunday',   time: null,             open: false },
];

export function ContactPage() {
  const { lang, t } = useLang();
  const kh = lang === 'km';

  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="bg-[#FAF6EF] min-h-screen">
      {/* Page hero */}
      <div className="bg-[#9B1C1C] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-8 h-[3px] bg-[#C9A84C] mb-3 rounded-full mx-auto" />
          <h1 className={`text-white mb-2 ${kh ? 'font-khmer text-3xl' : 'font-display text-4xl font-semibold'}`}>
            {t('contact.title')}
          </h1>
          <p className={`text-red-200 text-sm ${kh ? 'font-khmer' : ''}`}>
            {t('contact.subtitle')}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 grid grid-cols-1 lg:grid-cols-2 gap-10">

        {/* Left — info cards */}
        <div className="space-y-6">

          {/* Contact details */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
            <h2 className={`text-[#1C1917] font-semibold mb-6 ${kh ? 'font-khmer text-lg' : 'text-xl'}`}>
              {kh ? 'ព័ត៌មានទំនាក់ទំនង' : 'Contact Information'}
            </h2>
            <div className="space-y-5">
              {[
                { icon: Phone, label: t('contact.phone'), value: '+855 12 345 678', href: 'tel:+85512345678' },
                { icon: Mail,  label: t('contact.email'), value: 'info@khmerrasmi.com', href: 'mailto:info@khmerrasmi.com' },
                {
                  icon: MapPin,
                  label: t('contact.address'),
                  value: kh ? '123 ផ្លូវព្រះណូរ៉ូដម, ស្រុកដូនពេញ, ភ្នំពេញ, កម្ពុជា' : '123 Norodom Blvd, Daun Penh, Phnom Penh, Cambodia',
                  href: 'https://maps.google.com/?q=Phnom+Penh',
                },
              ].map(({ icon: Icon, label, value, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="flex items-start gap-4 group">
                  <div className="w-10 h-10 bg-[#FAF6EF] border border-[#C9A84C]/30 rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#9B1C1C]/10 transition-colors">
                    <Icon className="w-5 h-5 text-[#9B1C1C]" />
                  </div>
                  <div>
                    <p className={`text-xs text-gray-400 mb-0.5 ${kh ? 'font-khmer' : ''}`}>{label}</p>
                    <p className={`text-sm text-[#1C1917] font-medium group-hover:text-[#9B1C1C] transition-colors ${kh ? 'font-khmer' : ''}`}>
                      {value}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Opening hours */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
            <div className="flex items-center gap-2 mb-6">
              <Clock className="w-5 h-5 text-[#9B1C1C]" />
              <h2 className={`text-[#1C1917] font-semibold ${kh ? 'font-khmer text-lg' : 'text-xl'}`}>
                {t('contact.hours')}
              </h2>
            </div>
            <div className="space-y-3">
              {hours.map(({ dayKey, time, open }) => (
                <div key={dayKey} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className={`text-sm text-gray-600 ${kh ? 'font-khmer' : ''}`}>{t(dayKey)}</span>
                  <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${
                    open ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-400'
                  } ${kh ? 'font-khmer' : ''}`}>
                    {open ? time : t('contact.closed')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
            <h2 className={`text-[#1C1917] font-semibold mb-5 ${kh ? 'font-khmer text-lg' : 'text-xl'}`}>
              {t('home.follow')}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {socials.map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
                  style={{ color }}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span className="text-sm font-medium text-gray-700">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right — map + form */}
        <div className="space-y-6">
          {/* Map */}
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-100 h-72">
            <iframe
              title="Khmer Rasmi on Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=104.89,11.54,104.93,11.58&layer=mapnik&marker=11.5625,104.9100"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
            />
          </div>

          <a
            href="https://www.google.com/maps?q=Phnom+Penh"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 text-sm text-[#9B1C1C] hover:text-[#C9A84C] transition-colors ${kh ? 'font-khmer' : ''}`}
          >
            <MapPin className="w-4 h-4" />
            {t('contact.getDir')}
          </a>

          {/* Contact form */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-7">
            <h2 className={`text-[#1C1917] font-semibold mb-6 ${kh ? 'font-khmer text-lg' : 'text-xl'}`}>
              {kh ? 'ផ្ញើសារមកយើង' : 'Send Us a Message'}
            </h2>

            {sent ? (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className={`text-[#1C1917] font-semibold mb-1 ${kh ? 'font-khmer' : ''}`}>
                  {kh ? 'សារបានផ្ញើដោយជោគជ័យ!' : 'Message sent successfully!'}
                </p>
                <p className={`text-sm text-gray-500 ${kh ? 'font-khmer' : ''}`}>
                  {kh ? 'យើងនឹងឆ្លើយតបក្នុងពេលឆាប់ៗ' : 'We\'ll get back to you soon.'}
                </p>
                <button
                  onClick={() => setSent(false)}
                  className={`mt-5 text-sm text-[#9B1C1C] hover:underline ${kh ? 'font-khmer' : ''}`}
                >
                  {kh ? 'ផ្ញើសារម្តងទៀត' : 'Send another message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className={`block text-xs text-gray-500 mb-1.5 ${kh ? 'font-khmer' : ''}`}>
                    {t('contact.name')}
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className={`w-full px-4 py-2.5 bg-[#FAF6EF] border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition ${kh ? 'font-khmer' : ''}`}
                  />
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1.5">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="w-full px-4 py-2.5 bg-[#FAF6EF] border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition"
                  />
                </div>

                <div>
                  <label className={`block text-xs text-gray-500 mb-1.5 ${kh ? 'font-khmer' : ''}`}>
                    {t('contact.message')}
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    className={`w-full px-4 py-2.5 bg-[#FAF6EF] border border-gray-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-[#C9A84C]/40 focus:border-[#C9A84C] transition resize-none ${kh ? 'font-khmer' : ''}`}
                  />
                </div>

                <button
                  type="submit"
                  className={`w-full py-3 bg-[#9B1C1C] hover:bg-[#7f1515] text-white rounded-lg text-sm font-semibold transition-colors ${kh ? 'font-khmer' : ''}`}
                >
                  {t('contact.send')}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
