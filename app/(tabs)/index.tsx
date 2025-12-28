import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { TrendingUp, Award, Users, Target, Eye, Star, ChevronDown, ChevronUp, Mail, Phone, MapPin } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import Colors from '@/constants/colors';
import { companyInfo } from '@/mocks/company';
import { team } from '@/mocks/team';
import { testimonials } from '@/mocks/testimonials';
import { faqs } from '@/mocks/faq';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const { userProfile, courses, internships } = useApp();
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const stats = [
    { icon: TrendingUp, label: 'Active Courses', value: userProfile?.enrolledCourses.length || 0, color: Colors.primary },
    { icon: Award, label: 'Certificates', value: 0, color: Colors.secondary },
    { icon: Users, label: 'Internships', value: userProfile?.appliedInternships.length || 0, color: Colors.accent },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Hello, {userProfile?.name || 'Guest'}! 👋</Text>
            <Text style={styles.subtitle}>Ready to learn and grow?</Text>
          </View>
          <View style={styles.logoContainer}>
            <Image 
              source={{ uri: 'https://pub-e001eb4506b145aa938b5d3badbff6a5.r2.dev/attachments/c7fsi69rkf5m2z8io6d5y' }} 
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </View>

        <View style={styles.statsContainer}>
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                  <Icon color={stat.color} size={20} />
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Featured Bootcamps</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {courses.slice(0, 3).map((course) => (
              <TouchableOpacity
                key={course.id}
                style={styles.courseCard}
                onPress={() => router.push('/courses')}
              >
                <Image source={{ uri: course.image }} style={styles.courseImage} />
                <View style={styles.courseContent}>
                  <Text style={styles.courseTitle} numberOfLines={2}>{course.title}</Text>
                  <Text style={styles.courseDuration}>{course.duration} • {course.level}</Text>
                  <View style={styles.courseFooter}>
                    <Text style={styles.coursePrice}>₹{course.price.toLocaleString()}</Text>
                    <View style={styles.ratingContainer}>
                      <Text style={styles.rating}>⭐ {course.rating}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Latest Internships</Text>
          {internships.slice(0, 2).map((internship) => (
            <TouchableOpacity
              key={internship.id}
              style={styles.internshipCard}
              onPress={() => router.push('/internships')}
            >
              <View style={styles.internshipHeader}>
                <View style={styles.internshipIcon}>
                  <Text style={styles.internshipIconText}>{internship.company.charAt(0)}</Text>
                </View>
                <View style={styles.internshipInfo}>
                  <Text style={styles.internshipTitle} numberOfLines={1}>{internship.title}</Text>
                  <Text style={styles.internshipCompany}>{internship.company}</Text>
                </View>
                <View style={styles.internshipBadge}>
                  <Text style={styles.internshipBadgeText}>{internship.type}</Text>
                </View>
              </View>
              <View style={styles.internshipDetails}>
                <Text style={styles.internshipDetail}>💰 {internship.stipend}</Text>
                <Text style={styles.internshipDetail}>📅 {internship.duration}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About KushiraX</Text>
          <View style={styles.aboutCard}>
            <Text style={styles.aboutTagline}>{companyInfo.tagline}</Text>
            <Text style={styles.aboutDescription}>{companyInfo.description}</Text>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.missionVisionContainer}>
            <View style={styles.missionVisionCard}>
              <View style={styles.mvIcon}>
                <Target color={Colors.primary} size={24} />
              </View>
              <Text style={styles.mvTitle}>Our Mission</Text>
              <Text style={styles.mvText}>{companyInfo.mission}</Text>
            </View>
            <View style={styles.missionVisionCard}>
              <View style={styles.mvIcon}>
                <Eye color={Colors.secondary} size={24} />
              </View>
              <Text style={styles.mvTitle}>Our Vision</Text>
              <Text style={styles.mvText}>{companyInfo.vision}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Why Choose Us</Text>
          {companyInfo.whyChooseUs.map((item, index) => (
            <View key={index} style={styles.whyCard}>
              <View style={styles.whyIconContainer}>
                <Award color={Colors.accent} size={20} />
              </View>
              <View style={styles.whyContent}>
                <Text style={styles.whyTitle}>{item.title}</Text>
                <Text style={styles.whyDescription}>{item.description}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Meet Our Team</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
            {team.map((member) => (
              <View key={member.id} style={styles.teamCard}>
                <Image source={{ uri: member.image }} style={styles.teamImage} />
                <Text style={styles.teamName}>{member.name}</Text>
                <Text style={styles.teamRole}>{member.role}</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What Clients Say</Text>
          {testimonials.map((testimonial) => (
            <View key={testimonial.id} style={styles.testimonialCard}>
              <View style={styles.testimonialHeader}>
                <Text style={styles.testimonialName}>{testimonial.name}</Text>
                <View style={styles.starsContainer}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} color={Colors.accent} size={14} fill={Colors.accent} />
                  ))}
                </View>
              </View>
              <Text style={styles.testimonialText}>{testimonial.feedback}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqs.map((faq) => (
            <TouchableOpacity
              key={faq.id}
              style={styles.faqCard}
              onPress={() => setExpandedFaq(expandedFaq === faq.id ? null : faq.id)}
            >
              <View style={styles.faqHeader}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                {expandedFaq === faq.id ? (
                  <ChevronUp color={Colors.primary} size={20} />
                ) : (
                  <ChevronDown color={Colors.textSecondary} size={20} />
                )}
              </View>
              {expandedFaq === faq.id && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <View style={styles.contactCard}>
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Mail color={Colors.primary} size={20} />
              </View>
              <View>
                <Text style={styles.contactLabel}>Business Inquiries</Text>
                <Text style={styles.contactValue}>{companyInfo.contact.business}</Text>
              </View>
            </View>
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Mail color={Colors.secondary} size={20} />
              </View>
              <View>
                <Text style={styles.contactLabel}>HR & Recruitment</Text>
                <Text style={styles.contactValue}>{companyInfo.contact.hr}</Text>
              </View>
            </View>
            <View style={styles.contactItem}>
              <View style={styles.contactIcon}>
                <Phone color={Colors.accent} size={20} />
              </View>
              <View>
                <Text style={styles.contactLabel}>Support</Text>
                <Text style={styles.contactValue}>{companyInfo.contact.phone}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Office Locations</Text>
          {companyInfo.locations.map((location, index) => (
            <View key={index} style={styles.locationCard}>
              <View style={styles.locationIcon}>
                <MapPin color={Colors.primary} size={20} />
              </View>
              <View style={styles.locationContent}>
                <Text style={styles.locationName}>{location.name}</Text>
                <Text style={styles.locationType}>{location.type}</Text>
                <Text style={styles.locationAddress}>{location.address}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.ctaContainer}>
          <View style={styles.ctaCard}>
            <Text style={styles.ctaTitle}>Start Your Journey Today</Text>
            <Text style={styles.ctaSubtitle}>Join 2000+ learners building their future</Text>
            <TouchableOpacity
              style={styles.ctaButton}
              onPress={() => router.push('/courses')}
            >
              <Text style={styles.ctaButtonText}>Explore Courses</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>KushiraX Technology</Text>
          <Text style={styles.footerCopyright}>© 2025 All Rights Reserved</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: Colors.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  logoContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  logo: {
    width: 48,
    height: 48,
  },
  statsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: Colors.text,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: Colors.text,
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  horizontalScroll: {
    paddingLeft: 20,
  },
  courseCard: {
    width: width * 0.7,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  courseImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  courseContent: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  courseDuration: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coursePrice: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: Colors.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  internshipCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  internshipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  internshipIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  internshipIconText: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: Colors.surface,
  },
  internshipInfo: {
    flex: 1,
    marginLeft: 12,
  },
  internshipTitle: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: Colors.text,
  },
  internshipCompany: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  internshipBadge: {
    backgroundColor: `${Colors.accent}15`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  internshipBadgeText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.accent,
  },
  internshipDetails: {
    flexDirection: 'row',
    gap: 16,
  },
  internshipDetail: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  ctaContainer: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  ctaCard: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: 'bold' as const,
    color: Colors.surface,
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 15,
    color: Colors.surface,
    opacity: 0.9,
    marginBottom: 20,
  },
  ctaButton: {
    backgroundColor: Colors.surface,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: Colors.primary,
  },
  aboutCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  aboutTagline: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  aboutDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  missionVisionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  missionVisionCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  mvIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  mvTitle: {
    fontSize: 14,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginBottom: 6,
  },
  mvText: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
  },
  whyCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  whyIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.accent}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  whyContent: {
    flex: 1,
    marginLeft: 12,
  },
  whyTitle: {
    fontSize: 15,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  whyDescription: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  teamCard: {
    width: 160,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginRight: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  teamImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  teamName: {
    fontSize: 14,
    fontWeight: 'bold' as const,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  teamRole: {
    fontSize: 12,
    color: Colors.textSecondary,
    textAlign: 'center',
  },
  testimonialCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  testimonialHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  testimonialName: {
    fontSize: 15,
    fontWeight: 'bold' as const,
    color: Colors.text,
  },
  starsContainer: {
    flexDirection: 'row',
    gap: 2,
  },
  testimonialText: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  faqCard: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    flex: 1,
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
    marginRight: 8,
  },
  faqAnswer: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginTop: 12,
  },
  contactCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginBottom: 2,
  },
  contactValue: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  locationCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  locationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${Colors.primary}15`,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationContent: {
    flex: 1,
    marginLeft: 12,
  },
  locationName: {
    fontSize: 15,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginBottom: 2,
  },
  locationType: {
    fontSize: 12,
    color: Colors.primary,
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  footerCopyright: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
