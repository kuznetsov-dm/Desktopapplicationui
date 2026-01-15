import { BrandLogo } from './BrandLogo';

export function BrandGuide() {
  return (
    <div className="h-full overflow-auto bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Meeting Manager
          </h1>
          <p className="text-xl text-gray-600">Brand Guidelines & Visual Identity</p>
        </div>

        {/* Logo Variations */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Logo Variations</h2>
          
          <div className="grid grid-cols-3 gap-8">
            {/* Full Logo */}
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-white flex items-center justify-center min-h-[120px]">
                <BrandLogo variant="full" size="md" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Full Logo</h3>
                <p className="text-sm text-gray-600">Use for primary branding</p>
              </div>
            </div>

            {/* Compact Logo */}
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-white flex items-center justify-center min-h-[120px]">
                <BrandLogo variant="compact" size="md" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Compact Logo</h3>
                <p className="text-sm text-gray-600">Use for headers & navigation</p>
              </div>
            </div>

            {/* Icon Only */}
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 bg-white flex items-center justify-center min-h-[120px]">
                <BrandLogo variant="icon" size="lg" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Icon Only</h3>
                <p className="text-sm text-gray-600">Use for app icon & small spaces</p>
              </div>
            </div>
          </div>

          {/* Dark Background */}
          <div className="mt-8">
            <h3 className="font-semibold text-gray-900 mb-4">On Dark Background</h3>
            <div className="bg-gray-900 rounded-xl p-8 flex items-center justify-around">
              <BrandLogo variant="full" size="md" theme="dark" />
              <BrandLogo variant="compact" size="md" theme="dark" />
              <BrandLogo variant="icon" size="lg" theme="dark" />
            </div>
          </div>
        </section>

        {/* Color Palette */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Color Palette</h2>
          
          {/* Primary Colors */}
          <div className="mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">Primary Gradient</h3>
            <div className="grid grid-cols-5 gap-4">
              {[
                { name: 'Blue Start', hex: '#3B82F6', rgb: 'rgb(59, 130, 246)' },
                { name: 'Blue Mid', hex: '#6366F1', rgb: 'rgb(99, 102, 241)' },
                { name: 'Purple', hex: '#8B5CF6', rgb: 'rgb(139, 92, 246)' },
                { name: 'Purple-Pink', hex: '#A855F7', rgb: 'rgb(168, 85, 247)' },
                { name: 'Pink End', hex: '#EC4899', rgb: 'rgb(236, 72, 153)' },
              ].map((color) => (
                <div key={color.name} className="space-y-2">
                  <div
                    className="h-24 rounded-lg shadow-md"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <div className="font-semibold text-sm text-gray-900">{color.name}</div>
                    <div className="text-xs text-gray-600">{color.hex}</div>
                    <div className="text-xs text-gray-500">{color.rgb}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Neutral Colors */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Neutral Colors</h3>
            <div className="grid grid-cols-6 gap-4">
              {[
                { name: 'White', hex: '#FFFFFF' },
                { name: 'Gray 50', hex: '#F9FAFB' },
                { name: 'Gray 100', hex: '#F3F4F6' },
                { name: 'Gray 600', hex: '#4B5563' },
                { name: 'Gray 900', hex: '#111827' },
                { name: 'Black', hex: '#000000' },
              ].map((color) => (
                <div key={color.name} className="space-y-2">
                  <div
                    className="h-16 rounded-lg shadow-md border border-gray-200"
                    style={{ backgroundColor: color.hex }}
                  />
                  <div>
                    <div className="font-semibold text-xs text-gray-900">{color.name}</div>
                    <div className="text-xs text-gray-600">{color.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Typography</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Primary Font: Inter
              </h3>
              <div className="space-y-3">
                <div className="text-4xl font-bold text-gray-900">
                  The quick brown fox jumps
                </div>
                <div className="text-2xl font-semibold text-gray-900">
                  The quick brown fox jumps
                </div>
                <div className="text-lg font-medium text-gray-900">
                  The quick brown fox jumps over the lazy dog
                </div>
                <div className="text-base text-gray-700">
                  The quick brown fox jumps over the lazy dog. 0123456789
                </div>
                <div className="text-sm text-gray-600">
                  The quick brown fox jumps over the lazy dog. 0123456789
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                Monospace Font: JetBrains Mono
              </h3>
              <div className="space-y-3">
                <div className="font-mono text-base text-gray-900">
                  console.log("Hello, World!");
                </div>
                <div className="font-mono text-sm text-gray-700">
                  function processMeeting(id: string) {'{'}
                </div>
                <div className="font-mono text-xs text-gray-600">
                  const result = await pipeline.execute();
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Visual Elements */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Visual Elements</h2>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Gradient Button */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Primary Button</h3>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg shadow-lg shadow-purple-500/30 transition-all">
                Process Meeting
              </button>
            </div>

            {/* Gradient Border Card */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Accent Card</h3>
              <div className="p-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-lg">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-700">Content with gradient border</p>
                </div>
              </div>
            </div>

            {/* Gradient Background */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Gradient Background</h3>
              <div className="h-24 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-lg border border-purple-200 flex items-center justify-center">
                <span className="text-sm text-gray-700">Subtle gradient background</span>
              </div>
            </div>

            {/* Status Indicators */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900">Status Indicators</h3>
              <div className="flex gap-3">
                <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  Success
                </div>
                <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                  Processing
                </div>
                <div className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                  Error
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Usage Guidelines */}
        <section className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Usage Guidelines</h2>
          
          <div className="grid grid-cols-2 gap-8">
            {/* Do's */}
            <div>
              <h3 className="font-semibold text-green-700 mb-4 flex items-center gap-2">
                <span className="text-xl">✓</span> Do
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Use the gradient for primary actions and branding</li>
                <li>• Maintain consistent spacing around the logo</li>
                <li>• Use Inter font for all UI text</li>
                <li>• Keep sufficient contrast for accessibility</li>
                <li>• Use icon-only logo for small spaces (min 24px)</li>
              </ul>
            </div>

            {/* Don'ts */}
            <div>
              <h3 className="font-semibold text-red-700 mb-4 flex items-center gap-2">
                <span className="text-xl">✗</span> Don't
              </h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>• Don't distort or rotate the logo</li>
                <li>• Don't use gradient on large text blocks</li>
                <li>• Don't change the gradient color stops</li>
                <li>• Don't use the logo on busy backgrounds</li>
                <li>• Don't use icon smaller than 24px</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
