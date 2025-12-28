import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Mail, BookOpen, Briefcase, Settings, LogOut, Award, TrendingUp } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import Colors from '@/constants/colors';

export default function ProfileScreen() {
  const { userProfile, courses, internships } = useApp();

  const enrolledCourses = courses.filter((course) =>
    userProfile?.enrolledCourses.includes(course.id)
  );

  const appliedInternships = internships.filter((internship) =>
    userProfile?.appliedInternships.includes(internship.id)
  );

  const stats = [
    { icon: BookOpen, label: 'Enrolled Courses', value: enrolledCourses.length, color: Colors.primary },
    { icon: Briefcase, label: 'Applied Internships', value: appliedInternships.length, color: Colors.secondary },
    { icon: Award, label: 'Certificates', value: 0, color: Colors.accent },
    { icon: TrendingUp, label: 'Learning Hours', value: 0, color: Colors.success },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <User color={Colors.surface} size={40} />
          </View>
          <Text style={styles.name}>{userProfile?.name || 'Guest User'}</Text>
          <Text style={styles.email}>{userProfile?.email || 'guest@kushirax.com'}</Text>
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

        {enrolledCourses.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Courses</Text>
            {enrolledCourses.map((course) => (
              <View key={course.id} style={styles.listItem}>
                <View style={styles.listItemIcon}>
                  <BookOpen color={Colors.primary} size={20} />
                </View>
                <View style={styles.listItemContent}>
                  <Text style={styles.listItemTitle}>{course.title}</Text>
                  <Text style={styles.listItemSubtitle}>{course.duration} • {course.level}</Text>
                </View>
                <View style={styles.progressBadge}>
                  <Text style={styles.progressText}>0%</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {appliedInternships.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Applied Internships</Text>
            {appliedInternships.map((internship) => (
              <View key={internship.id} style={styles.listItem}>
                <View style={styles.listItemIcon}>
                  <Briefcase color={Colors.secondary} size={20} />
                </View>
                <View style={styles.listItemContent}>
                  <Text style={styles.listItemTitle}>{internship.title}</Text>
                  <Text style={styles.listItemSubtitle}>{internship.company}</Text>
                </View>
                <View style={[styles.statusBadge, { backgroundColor: `${Colors.accent}15` }]}>
                  <Text style={[styles.statusText, { color: Colors.accent }]}>Pending</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemIcon}>
              <User color={Colors.textSecondary} size={20} />
            </View>
            <Text style={styles.menuItemText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemIcon}>
              <Mail color={Colors.textSecondary} size={20} />
            </View>
            <Text style={styles.menuItemText}>Notifications</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.menuItem}>
            <View style={styles.menuItemIcon}>
              <Settings color={Colors.textSecondary} size={20} />
            </View>
            <Text style={styles.menuItemText}>Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
            <View style={styles.menuItemIcon}>
              <LogOut color={Colors.secondary} size={20} />
            </View>
            <Text style={[styles.menuItemText, styles.logoutText]}>Logout</Text>
          </TouchableOpacity>
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
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginBottom: 4,
  },
  email: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    minWidth: '47%',
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
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginBottom: 16,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  listItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listItemContent: {
    flex: 1,
    marginLeft: 12,
  },
  listItemTitle: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  listItemSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  progressBadge: {
    backgroundColor: `${Colors.success}15`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600' as const,
    color: Colors.success,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  menuItemIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 15,
    fontWeight: '500' as const,
    color: Colors.text,
    marginLeft: 12,
  },
  logoutItem: {
    marginTop: 8,
  },
  logoutText: {
    color: Colors.secondary,
  },
});
