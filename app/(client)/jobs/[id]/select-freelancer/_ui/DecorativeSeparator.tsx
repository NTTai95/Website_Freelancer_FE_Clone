/**
 * @file DecorativeSeparator.tsx
 * @description Component trang trí để tạo separator đẹp giữa các sections.
 * Sử dụng gradients, patterns và animations để tạo visual interest
 * thay vì để vùng trắng không có nội dung.
 * 
 * @component
 * @param {object} props - Các thuộc tính của component
 * @param {string} props.type - Loại separator ('wave', 'dots', 'gradient')
 * @param {number} props.height - Chiều cao của separator (mặc định 60px)
 * @returns {React.ReactElement} Decorative separator với animation effects
 */
'use client';

interface DecorativeSeparatorProps {
  type?: 'wave' | 'dots' | 'gradient' | 'geometric';
  height?: number;
}

export default function DecorativeSeparator({ 
  type = 'gradient', 
  height = 60 
}: DecorativeSeparatorProps) {

  const renderWave = () => (
    <div style={{ 
      height: height,
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      position: 'relative',
      overflow: 'hidden',
      marginBottom: 24
    }}>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={{ position: 'absolute', bottom: 0 }}
      >
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          fill="#355a8e"
          fillOpacity="0.1"
        />
      </svg>
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        color: '#6b7280',
        fontSize: 12,
        fontWeight: 500
      }}>
        ✨ ◦ ✨ ◦ ✨
      </div>
    </div>
  );

  const renderDots = () => (
    <div style={{
      height: height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      marginBottom: 24,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle, rgba(53, 90, 142, 0.1) 1px, transparent 1px)',
        backgroundSize: '20px 20px',
        animation: 'float 6s ease-in-out infinite'
      }} />
      
      {/* Central Dots */}
      <div className="flex items-center space-x-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div
            key={i}
            style={{
              width: i === 2 ? 12 : 8,
              height: i === 2 ? 12 : 8,
              borderRadius: '50%',
              background: i === 2 
                ? 'linear-gradient(135deg, #355a8e, #01204b)' 
                : 'rgba(53, 90, 142, 0.3)',
              animation: `pulse ${2 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>
    </div>
  );

  const renderGradient = () => (
    <div style={{
      height: height,
      background: 'linear-gradient(135deg, rgba(53, 90, 142, 0.05) 0%, rgba(16, 185, 129, 0.05) 50%, rgba(245, 158, 11, 0.05) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Floating Elements */}
      <div style={{
        position: 'absolute',
        top: '20%',
        left: '20%',
        width: 40,
        height: 40,
        borderRadius: '50%',
        background: 'rgba(53, 90, 142, 0.1)',
        animation: 'float 4s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '60%',
        right: '30%',
        width: 24,
        height: 24,
        borderRadius: '50%',
        background: 'rgba(16, 185, 129, 0.1)',
        animation: 'float 3s ease-in-out infinite reverse'
      }} />
      
      {/* Center Content */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        color: '#6b7280',
        fontSize: 14
      }}>
        <div style={{
          width: 30,
          height: 1,
          background: 'linear-gradient(90deg, transparent, #355a8e, transparent)'
        }} />
        <span style={{ fontWeight: 500 }}>◆</span>
        <div style={{
          width: 30,
          height: 1,
          background: 'linear-gradient(90deg, transparent, #355a8e, transparent)'
        }} />
      </div>
    </div>
  );

  const renderGeometric = () => (
    <div style={{
      height: height,
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24,
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Geometric Shapes */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '10%',
        width: 20,
        height: 20,
        background: 'rgba(53, 90, 142, 0.1)',
        transform: 'rotate(45deg)',
        animation: 'spin 8s linear infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '15%',
        width: 16,
        height: 16,
        background: 'rgba(16, 185, 129, 0.1)',
        borderRadius: '50%',
        animation: 'pulse 3s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '80%',
        width: 0,
        height: 0,
        borderLeft: '8px solid transparent',
        borderRight: '8px solid transparent',
        borderBottom: '14px solid rgba(245, 158, 11, 0.2)',
        animation: 'float 5s ease-in-out infinite'
      }} />
      
      {/* Center Pattern */}
      <div className="flex items-center space-x-4">
        <div style={{
          width: 12,
          height: 12,
          background: 'linear-gradient(135deg, #355a8e, #01204b)',
          transform: 'rotate(45deg)'
        }} />
        <div style={{
          width: 40,
          height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(53, 90, 142, 0.5), transparent)'
        }} />
        <div style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'rgba(16, 185, 129, 0.7)'
        }} />
        <div style={{
          width: 40,
          height: 2,
          background: 'linear-gradient(90deg, transparent, rgba(53, 90, 142, 0.5), transparent)'
        }} />
        <div style={{
          width: 12,
          height: 12,
          background: 'linear-gradient(135deg, #355a8e, #01204b)',
          transform: 'rotate(45deg)'
        }} />
      </div>
    </div>
  );

  switch (type) {
    case 'wave':
      return renderWave();
    case 'dots':
      return renderDots();
    case 'geometric':
      return renderGeometric();
    default:
      return renderGradient();
  }
} 