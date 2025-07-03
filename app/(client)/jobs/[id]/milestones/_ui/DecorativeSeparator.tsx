/**
 * @file DecorativeSeparator.tsx
 * @description Component trang trí để tạo separator đẹp giữa các sections trong milestones.
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

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
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

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );

  // Simple line separator as default
  const renderSimple = () => (
    <div style={{
      height: '1px',
      background: 'linear-gradient(90deg, transparent 0%, #e2e8f0 50%, transparent 100%)',
      position: 'relative',
      margin: '16px 0'
    }}>
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        width: '8px',
        height: '8px',
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)'
      }} />
    </div>
  );

  switch (type) {
    case 'dots':
      return renderDots();
    case 'gradient':
      return renderGradient();
    default:
      return renderSimple();
  }
} 