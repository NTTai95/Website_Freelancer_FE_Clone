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

  const getSkillColor = (skillName: string) => {
    const techColors: { [key: string]: string } = {
      'ReactJS': 'blue',
      'Node.js': 'green',
      'API Documentation': 'purple',
      'Technical Blogging': 'orange',
      'JavaScript': 'yellow',
      'TypeScript': 'blue',
      'Python': 'green',
      'Java': 'red'
    };
    return techColors[skillName] || 'default';
  };

  const getLanguageFlag = (iso: string) => {
    const flags: { [key: string]: string } = {
      'DE': '🇩🇪',
      'ES': '🇪🇸',
      'RU': '🇷🇺',
      'JA': '🇯🇵',
      'KO': '🇰🇷',
      'ZH': '🇨🇳',
      'IT': '🇮🇹',
      'NL': '🇳🇱',
      'TR': '🇹🇷'
    };
    return flags[iso] || '🌐';
  };

  const displayedLanguages = showAllLanguages 
    ? skillsData.languages 
    : skillsData.languages.slice(0, 5);

  return (
    <Card className="shadow-md border-0 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="space-y-8">
        {/* Skills Section */}
        <div className="space-y-5">
          <Title level={4} className="!mb-4 !text-gray-900 !font-bold flex items-center gap-2 transition-colors duration-300 hover:text-blue-600 group">
            <ToolOutlined className="text-blue-600 mr-1 transition-all duration-300 group-hover:scale-125 group-hover:rotate-12" />
            Kỹ năng ({skillsData.skills.length})
            <StarOutlined className="text-yellow-500 text-sm ml-auto opacity-0 group-hover:opacity-100 transition-all duration-300 animate-pulse" />
          </Title>
          
          <div className="flex flex-wrap gap-3">
            {skillsData.skills.map((skill) => (
              <Tooltip 
                key={skill.id}
                title={`Kỹ năng ${skill.name}`}
                placement="top"
              >
                <Tag
                  color={getSkillColor(skill.name)}
                  className="px-3 py-2 text-sm font-semibold rounded-full border-0 transition-all duration-300 hover:scale-110 hover:shadow-lg cursor-pointer transform hover:-translate-y-1"
                  onMouseEnter={() => setHoveredSkill(skill.id)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  {skill.name}
                  {hoveredSkill === skill.id && (
                    <span className="ml-1 animate-bounce">✨</span>
                  )}
                </Tag>
              </Tooltip>
            ))}
          </div>
        </div>

        <Divider className="!my-6" />

        {/* Languages Section */}
        <div className="space-y-5">
          <Title level={4} className="!mb-4 !text-gray-900 !font-bold flex items-center gap-2">
            <GlobalOutlined className="text-green-600 mr-1" />
            Ngôn ngữ ({skillsData.languages.length})
          </Title>
          
          <div className="space-y-3">
            {displayedLanguages.map((language) => (
              <div 
                key={language.id} 
                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">
                    {getLanguageFlag(language.iso)}
                  </span>
                  <Text className="text-sm font-semibold text-gray-800">
                    {language.name}
                  </Text>
                </div>
                <Tag color="green" className="text-xs font-medium px-2 py-1">
                  {language.iso}
                </Tag>
              </div>
            ))}
          </div>
          
          {/* Show More/Less Button */}
          {skillsData.languages.length > 5 && (
            <div className="text-center mt-4">
              <Button
                type="text"
                size="small"
                icon={<EyeOutlined />}
                onClick={() => setShowAllLanguages(!showAllLanguages)}
                className="text-blue-600 hover:text-blue-800 font-medium"
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