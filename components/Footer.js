import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand"><img src="/seal.svg" alt="" style={{ height: 50, verticalAlign: 'middle', marginRight: 10 }} /> Springfield State University</div>
            <p>Founded in 1932, Springfield State University is a public research university committed to academic excellence, innovation, and community engagement. Located in the heart of Springfield, our campus spans over 200 acres and serves a diverse community of learners.</p>
          </div>
          <div>
            <h4>Study</h4>
            <Link href="/academics">Undergraduate</Link>
            <Link href="/academics">Postgraduate</Link>
            <Link href="/academics">Lifelong Learning</Link>
            <Link href="/courses">Course Catalog</Link>
            <Link href="/register">Apply Now</Link>
          </div>
          <div>
            <h4>Research</h4>
            <Link href="/research">Research Centers</Link>
            <Link href="/research">Innovation Lab</Link>
            <Link href="/library">Library</Link>
            <Link href="/research">Publications</Link>
            <Link href="/contact">Partnerships</Link>
          </div>
          <div>
            <h4>Quick Links</h4>
            <Link href="/login">Student Portal</Link>
            <Link href="/admin">Staff Directory</Link>
            <Link href="/campus-map">Campus Map</Link>
            <Link href="/contact">Jobs</Link>
            <Link href="/contact">Contact Us</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <div>&copy; 2026 Springfield State University. All rights reserved.</div>
          <div>
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/accessibility">Accessibility</Link>
            <Link href="/terms">Terms of Use</Link>
            <Link href="/login">Portal Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
