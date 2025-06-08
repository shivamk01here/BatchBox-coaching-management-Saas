import React from 'react';
import { 
  Star, 
  Users, 
  Globe, 
  CheckCircle, 
  Zap, 
  Brain, 
  TrendingUp, 
  Clock,
  ArrowRight,
  Play,
  Award,
  BarChart3,
  Mail,
  Phone,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
  Menu,
  X
} from 'lucide-react';

const Homepage = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      {/* Transparent Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">B</span>
                </div>
                <span className="text-2xl font-bold text-gray-900">BatchBox</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-700 hover:text-purple-600 transition-colors">Features</a>
                <a href="#pricing" className="text-gray-700 hover:text-purple-600 transition-colors">Pricing</a>
                <a href="#about" className="text-gray-700 hover:text-purple-600 transition-colors">About</a>
                <a href="#contact" className="text-gray-700 hover:text-purple-600 transition-colors">Contact</a>
                <button className="text-gray-700 hover:text-purple-600 transition-colors font-medium">
                  Login
                </button>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105">
                  Get Started
                </button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-gray-700 hover:text-purple-600 transition-colors"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
              <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-200">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  <a href="#features" className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors">Features</a>
                  <a href="#pricing" className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors">Pricing</a>
                  <a href="#about" className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors">About</a>
                  <a href="#contact" className="block px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors">Contact</a>
                  <button className="block w-full text-left px-3 py-2 text-gray-700 hover:text-purple-600 transition-colors font-medium">
                    Login
                  </button>
                  <button className="block w-full mt-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
                    Get Started
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative overflow-hidden pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Discover the{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700">
                    freedom
                  </span>
                  <br />
                  of AI-powered coaching
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Manage your coaching, testing, and student progress easily, all in one powerful AI-driven platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2">
                  Start Free Trial
                  <ArrowRight size={20} />
                </button>
                <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2">
                  <Play size={20} />
                  Watch Demo
                </button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center gap-8 pt-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 border-2 border-white flex items-center justify-center text-white font-bold text-sm">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">200k+</div>
                  <div className="text-sm text-gray-600">Satisfied coaches</div>
                </div>
              </div>
            </div>

            {/* Right - Desktop and Mobile Mockups */}
            <div className="relative">
              <div className="relative">
                {/* Desktop Mockup (Background) */}
                <div className="relative mx-auto w-full max-w-2xl">
                  <div className="bg-gray-900 rounded-t-xl p-2 shadow-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="bg-white rounded-lg overflow-hidden h-80">
                      {/* Desktop Dashboard Content */}
                      <div className="h-full bg-gradient-to-br from-slate-50 to-blue-50 p-6">
                        <div className="flex items-center gap-4 mb-6">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold">B</span>
                          </div>
                          <div>
                            <h2 className="text-xl font-bold text-gray-900">BatchBox Dashboard</h2>
                            <p className="text-gray-600 text-sm">AI-Powered Coaching Platform</p>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="text-2xl font-bold text-blue-600">1,240</div>
                            <div className="text-sm text-gray-600">Total Students</div>
                          </div>
                          <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="text-2xl font-bold text-purple-600">47</div>
                            <div className="text-sm text-gray-600">Tests Today</div>
                          </div>
                          <div className="bg-white rounded-xl p-4 shadow-sm">
                            <div className="text-2xl font-bold text-green-600">94%</div>
                            <div className="text-sm text-gray-600">Success Rate</div>
                          </div>
                        </div>

                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <h3 className="font-semibold text-gray-900 mb-3">Recent AI Tests Generated</h3>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 text-sm">
                              <Brain className="text-purple-500" size={16} />
                              <span>Mathematics - Chapter 5 Quiz</span>
                              <span className="ml-auto text-green-600">●</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                              <Brain className="text-blue-500" size={16} />
                              <span>Physics - Motion Problems</span>
                              <span className="ml-auto text-green-600">●</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Mockup (Overlapping) */}
                <div className="absolute -bottom-8 -right-4 sm:-right-8 lg:-right-12">
                  <div className="w-48 sm:w-56 h-96 sm:h-112">
                    <div className="absolute inset-0 bg-gray-900 rounded-[2rem] shadow-2xl">
                      <div className="absolute inset-2 bg-black rounded-[1.5rem] overflow-hidden">
                        <div className="h-full bg-gradient-to-br from-slate-900 to-purple-900 relative">
                          {/* Mobile Status Bar */}
                          <div className="flex justify-between items-center px-4 pt-3 text-white text-xs">
                            <span>9:41</span>
                            <div className="flex items-center gap-1">
                              <div className="flex gap-1">
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                                <div className="w-1 h-1 bg-white rounded-full"></div>
                              </div>
                              <div className="w-4 h-2 border border-white rounded-sm">
                                <div className="w-3 h-1 bg-white rounded-xs"></div>
                              </div>
                            </div>
                          </div>

                          {/* Mobile App Content */}
                          <div className="px-4 pt-6">
                            <div className="flex items-center gap-2 mb-4">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold text-sm">B</span>
                              </div>
                              <div>
                                <div className="text-white font-semibold text-sm">BatchBox</div>
                                <div className="text-gray-400 text-xs">Mobile Dashboard</div>
                              </div>
                            </div>

                            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-4 mb-4">
                              <div className="text-blue-100 text-xs mb-1">Active Students</div>
                              <div className="text-white text-2xl font-bold mb-3">1,180</div>
                              <div className="grid grid-cols-2 gap-2">
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 text-center">
                                  <div className="text-white text-xs">Tests</div>
                                  <div className="text-white font-semibold text-sm">47</div>
                                </div>
                                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-2 py-1 text-center">
                                  <div className="text-white text-xs">Success</div>
                                  <div className="text-white font-semibold text-sm">94%</div>
                                </div>
                              </div>
                            </div>

                            <div className="text-white mb-3">
                              <div className="text-sm font-semibold mb-2">AI Insights</div>
                              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <Brain className="text-purple-400" size={14} />
                                  <span className="text-xs">Auto-Generate Quiz</span>
                                </div>
                                <div className="text-gray-300 text-xs">Physics - Chapter 3</div>
                                <div className="mt-2 bg-gradient-to-r from-green-500 to-blue-500 h-1.5 rounded-full w-3/4"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -left-4 top-20 bg-white rounded-xl shadow-lg p-3 animate-pulse hidden sm:block">
                  <Award className="text-yellow-500" size={24} />
                </div>
                <div className="absolute -right-8 bottom-20 bg-white rounded-xl shadow-lg p-3 animate-bounce hidden lg:block">
                  <TrendingUp className="text-green-500" size={24} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white/50 backdrop-blur-sm py-16" id="features">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">4.8</div>
              <div className="text-gray-600">App Rating</div>
              <div className="flex justify-center mt-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={16} className="text-yellow-400 fill-current" />
                ))}
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">50+</div>
              <div className="text-gray-600">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">200k+</div>
              <div className="text-gray-600">Active Coaches</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-900 mb-2">99.9%</div>
              <div className="text-gray-600">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              🚀 BatchBox – Power Your Coaching with AI‑Driven Testing
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete coaching management supercharged with AI-powered testing and evaluation
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <Zap className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Effortless Setup & Automation</h3>
              <p className="text-gray-600 leading-relaxed">
                Intuitive scheduling, attendance tracking, billing, and reminders with full AI-enabled testing and evaluation.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <Brain className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">AI‑Generated Custom Tests</h3>
              <p className="text-gray-600 leading-relaxed">
                Instantly generate personalized quizzes tailored to each student's curriculum, strengths, and learning gaps.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Instant AI Evaluation & Feedback</h3>
              <p className="text-gray-600 leading-relaxed">
                No more manual grading—our AI grades tests, highlights errors, and provides automated progress feedback instantly.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center mb-6">
                <BarChart3 className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Insights & Growth</h3>
              <p className="text-gray-600 leading-relaxed">
                AI-powered analytics recommend how to focus lessons and optimize your coaching effectiveness over time.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <Clock className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Time Saved</h3>
              <p className="text-gray-600 leading-relaxed">
                Automate test creation and evaluation—focus on teaching, not marking. Save hours every week.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="text-white" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Data‑Driven Growth</h3>
              <p className="text-gray-600 leading-relaxed">
                Understand performance trends with automatic AI insights and next-step suggestions for every student.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-purple-700 py-20" id="pricing">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            AI‑Driven Testing = Smarter Coaching
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Maximize efficiency. Elevate learning. Empower growth—effortlessly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 shadow-lg">
              Start Free 7-Day Trial
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300">
              Schedule Demo
            </button>
          </div>
          <p className="text-blue-100 text-sm mt-4">No credit card needed • Full access • Cancel anytime</p>
        </div>
      </div>

      {/* Modern Footer */}
      <footer className="bg-gray-900 text-white py-16" id="contact">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 via-purple-600 to-purple-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">B</span>
                </div>
                <span className="text-2xl font-bold">BatchBox</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Empowering coaches worldwide with AI-driven testing and comprehensive student management solutions.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Integrations</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Security</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Status Page</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Bug Reports</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail size={16} className="text-purple-400" />
                  <span className="text-gray-400">hello@batchbox.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone size={16} className="text-purple-400" />
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={16} className="text-purple-400" />
                  <span className="text-gray-400">San Francisco, CA</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-12 pt-8 border-t border-gray-800">
            <div className="flex flex-col sm:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2024 BatchBox. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 sm:mt-0">
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Terms of Service</a>
                <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;