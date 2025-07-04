/**
 * @file SkillsSection.tsx
 * @description Component hiển thị kỹ năng và ngôn ngữ của freelancer.
 * Bao gồm logic phức tạp để map language ISO codes thành emoji flags và
 * tạo màu ngẫu nhiên nhưng consistent cho skills. Có tính năng show/hide languages.
 * 
 * @component
 * @param {object} props - Các thuộc tính của component
 * @param {object} props.data - Dữ liệu freelancer chứa skills và languages
 * @returns {React.ReactElement} Card hiển thị skills và languages với interactive elements
 */
'use client';

import { Card, Tag, Typography, Divider, Button, Tooltip } from 'antd';
import { ToolOutlined, GlobalOutlined, EyeOutlined, StarOutlined } from '@ant-design/icons';
import { ResponseDetail } from '@/types/respones/detail';
import { useState } from 'react';

const { Title, Text } = Typography;

interface SkillsSectionProps {
  data: ResponseDetail.Freelancer;
}

export default function SkillsSection({ data }: SkillsSectionProps) {
  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  const skillsData = {
    skills: data.skills,
    languages: data.languages
  };

  /**
   * @description Tạo màu consistent cho skill dựa trên ID.
   * Sử dụng modulo để đảm bảo cùng skill luôn có cùng màu.
   */
  const getRandomSkillColor = (skillId: number) => {
    const colors = [
      'magenta', 'red', 'volcano', 'orange', 'gold',
      'lime', 'green', 'cyan', 'blue', 'geekblue',
      'purple', 'pink'
    ];

    return colors[skillId % colors.length];
  };

  /**
   * @description Map ISO country codes thành emoji flags.
   * Comprehensive mapping cho hầu hết các quốc gia và ngôn ngữ phổ biến.
   * Fallback về 🌐 nếu không tìm thấy flag tương ứng.
   */
  const getLanguageFlag = (iso: string) => {
    const flags: { [key: string]: string } = {
      // Châu Âu
      'DE': '🇩🇪', // German
      'ES': '🇪🇸', // Spanish
      'FR': '🇫🇷', // French
      'IT': '🇮🇹', // Italian
      'NL': '🇳🇱', // Dutch
      'PT': '🇵🇹', // Portuguese
      'PL': '🇵🇱', // Polish
      'SE': '🇸🇪', // Swedish
      'SV': '🇸🇪', // Swedish (alternative)
      'NO': '🇳🇴', // Norwegian
      'DK': '🇩🇰', // Danish
      'FI': '🇫🇮', // Finnish
      'TR': '🇹🇷', // Turkish
      'GR': '🇬🇷', // Greek
      'RU': '🇷🇺', // Russian
      'UA': '🇺🇦', // Ukrainian
      'CZ': '🇨🇿', // Czech
      'HU': '🇭🇺', // Hungarian
      'RO': '🇷🇴', // Romanian
      'BG': '🇧🇬', // Bulgarian
      'HR': '🇭🇷', // Croatian
      'SK': '🇸🇰', // Slovak
      'SI': '🇸🇮', // Slovenian
      'EE': '🇪🇪', // Estonian
      'LV': '🇱🇻', // Latvian
      'LT': '🇱🇹', // Lithuanian

      // Châu Á
      'CN': '🇨🇳', // Chinese
      'ZH': '🇨🇳', // Chinese (alternative)
      'JP': '🇯🇵', // Japanese
      'JA': '🇯🇵', // Japanese (alternative)
      'KR': '🇰🇷', // Korean
      'KO': '🇰🇷', // Korean (alternative)
      'TH': '🇹🇭', // Thai
      'VN': '🇻🇳', // Vietnamese
      'VI': '🇻🇳', // Vietnamese (alternative)
      'ID': '🇮🇩', // Indonesian
      'MY': '🇲🇾', // Malaysian
      'SG': '🇸🇬', // Singapore
      'PH': '🇵🇭', // Filipino
      'IN': '🇮🇳', // Hindi/Indian
      'HI': '🇮🇳', // Hindi
      'BD': '🇧🇩', // Bengali
      'PK': '🇵🇰', // Urdu
      'LK': '🇱🇰', // Sinhala
      'MM': '🇲🇲', // Myanmar
      'KH': '🇰🇭', // Khmer
      'LA': '🇱🇦', // Lao
      'MN': '🇲🇳', // Mongolian
      'KZ': '🇰🇿', // Kazakh
      'UZ': '🇺🇿', // Uzbek
      'KG': '🇰🇬', // Kyrgyz
      'TJ': '🇹🇯', // Tajik
      'TM': '🇹🇲', // Turkmen
      'AF': '🇦🇫', // Afghan
      'IR': '🇮🇷', // Persian
      'IQ': '🇮🇶', // Iraqi
      'SA': '🇸🇦', // Arabic
      'AE': '🇦🇪', // Arabic (UAE)
      'IL': '🇮🇱', // Hebrew

      // Châu Mỹ
      'US': '🇺🇸', // English (US)
      'EN': '🇺🇸', // English
      'GB': '🇬🇧', // English (UK)
      'CA': '🇨🇦', // English/French (Canada)
      'MX': '🇲🇽', // Spanish (Mexico)
      'BR': '🇧🇷', // Portuguese (Brazil)
      'AR': '🇦🇷', // Spanish (Argentina)
      'CL': '🇨🇱', // Spanish (Chile)
      'CO': '🇨🇴', // Spanish (Colombia)
      'PE': '🇵🇪', // Spanish (Peru)
      'VE': '🇻🇪', // Spanish (Venezuela)
      'UY': '🇺🇾', // Spanish (Uruguay)
      'PY': '🇵🇾', // Spanish (Paraguay)
      'BO': '🇧🇴', // Spanish (Bolivia)
      'EC': '🇪🇨', // Spanish (Ecuador)

      // Châu Phi
      'ZA': '🇿🇦', // South Africa
      'EG': '🇪🇬', // Arabic (Egypt)
      'MA': '🇲🇦', // Arabic (Morocco)
      'TN': '🇹🇳', // Arabic (Tunisia)
      'DZ': '🇩🇿', // Arabic (Algeria)
      'LY': '🇱🇾', // Arabic (Libya)
      'SD': '🇸🇩', // Arabic (Sudan)
      'ET': '🇪🇹', // Ethiopian
      'KE': '🇰🇪', // Swahili
      'TZ': '🇹🇿', // Swahili
      'UG': '🇺🇬', // Swahili
      'GH': '🇬🇭', // English (Ghana)
      'NG': '🇳🇬', // English (Nigeria)

      // Châu Đại Dương
      'AU': '🇦🇺', // English (Australia)
      'NZ': '🇳🇿', // English (New Zealand)
      'FJ': '🇫🇯', // Fijian
      'PG': '🇵🇬', // Papua New Guinea
      'TO': '🇹🇴', // Tongan
      'WS': '🇼🇸', // Samoan
      'VU': '🇻🇺', // Vanuatu
      'SB': '🇸🇧', // Solomon Islands
      'FM': '🇫🇲', // Micronesia
      'PW': '🇵🇼', // Palau
      'MH': '🇲🇭', // Marshall Islands
      'KI': '🇰🇮', // Kiribati
      'TV': '🇹🇻', // Tuvalu
      'NR': '🇳🇷', // Nauru
    };

    return flags[iso.toUpperCase()] || '🌐';
  };

  const displayedLanguages = showAllLanguages
    ? skillsData.languages
    : skillsData.languages.slice(0, 5);

  return (
    <Card className="!shadow-md !border-0 hover:!shadow-xl !transition-all !duration-300 !transform hover:!-translate-y-1">
      <div className="!space-y-8">
        {/* Skills Section */}
        <div className="!space-y-5">
          <Title level={4} className="!mb-4 !text-gray-900 !font-bold !flex !items-center !gap-2 !transition-colors !duration-300 hover:!text-blue-600 group">
            <ToolOutlined className="!text-blue-600 !mr-1 !transition-all !duration-300 group-hover:!scale-125 group-hover:!rotate-12" />
            Kỹ năng ({skillsData.skills.length})
            <StarOutlined className="!text-yellow-500 !text-sm !ml-auto !opacity-0 group-hover:!opacity-100 !transition-all !duration-300 animate-pulse" />
          </Title>

          <div className="!flex !flex-wrap !gap-3">
            {skillsData.skills.map((skill) => (
              <Tooltip
                key={skill.id}
                title={`Kỹ năng ${skill.name}`}
                placement="top"
              >
                <Tag
                  color={getRandomSkillColor(skill.id)}
                  className="!px-3 !py-2 !text-sm !font-semibold !rounded-full !border-0 !transition-all !duration-300 hover:!scale-110 hover:!shadow-lg !cursor-pointer !transform hover:!-translate-y-1"
                  onMouseEnter={() => setHoveredSkill(skill.id)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {skill.name}
                  {hoveredSkill === skill.id && (
                    <span className="!ml-1 animate-bounce">✨</span>
                  )}
                </Tag>
              </Tooltip>
            ))}
          </div>
        </div>

        <Divider className="!my-6" />

        {/* Languages Section */}
        <div className="!space-y-5">
          <Title level={4} className="!mb-4 !text-gray-900 !font-bold !flex !items-center !gap-2 !transition-colors !duration-300 hover:!text-green-600 group">
            <GlobalOutlined className="!text-green-600 !mr-1 !transition-all !duration-300 group-hover:!scale-125 group-hover:!rotate-12" />
            Ngôn ngữ ({skillsData.languages.length})
          </Title>

          <div className="!space-y-3">
            {displayedLanguages.map((language) => (
              <div
                key={language.id}
                className="!flex !items-center !justify-between !p-3 !bg-gray-50 !rounded-lg hover:!bg-gradient-to-r hover:!from-green-50 hover:!to-blue-50 !transition-all !duration-300 !border !border-gray-100 hover:!border-green-200 hover:!shadow-sm"
              >
                <div className="!flex !items-center !gap-3">
                  <span className="!text-2xl !transition-transform !duration-300 hover:!scale-125">
                    {getLanguageFlag(language.iso)}
                  </span>
                  <Text className="!text-sm !font-semibold !text-gray-800 !transition-colors !duration-300 hover:!text-green-700">
                    {language.name}
                  </Text>
                </div>
                <Tag
                  color="green"
                  className="!text-xs !font-medium !px-2 !py-1 !transition-all !duration-300 hover:!scale-110 hover:!shadow-md"
                >
                  {language.iso.toUpperCase()}
                </Tag>
              </div>
            ))}
          </div>

          {/* Show More/Less Button */}
          {skillsData.languages.length > 5 && (
            <div className="!text-center !mt-4">
              <Button
                type="text"
                size="small"
                icon={<EyeOutlined />}
                onClick={() => setShowAllLanguages(!showAllLanguages)}
                className="!text-blue-600 hover:!text-blue-800 !font-medium !transition-all !duration-300 hover:!scale-105"
              >
                {showAllLanguages
                  ? 'Thu gọn'
                  : `Xem thêm ${skillsData.languages.length - 5} ngôn ngữ`
                }
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
} 