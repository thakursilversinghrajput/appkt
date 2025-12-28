import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Clock, Users, Star, BookOpen } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import Colors from '@/constants/colors';
import { Course } from '@/mocks/courses';

export default function CoursesScreen() {
  const { courses, userProfile, enrollInCourse } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'fullstack', label: 'Full-Stack' },
    { id: 'ai', label: 'AI & ML' },
    { id: 'cybersecurity', label: 'Security' },
  ];

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEnroll = (courseId: string) => {
    enrollInCourse(courseId);
  };

  const isEnrolled = (courseId: string) => {
    return userProfile?.enrolledCourses.includes(courseId) || false;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore Courses</Text>
        <Text style={styles.headerSubtitle}>Level up your skills</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search color={Colors.textSecondary} size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search courses..."
            placeholderTextColor={Colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryChip,
              selectedCategory === category.id && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive,
              ]}
            >
              {category.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.coursesContainer}>
        {filteredCourses.map((course: Course) => (
          <View key={course.id} style={styles.courseCard}>
            <Image source={{ uri: course.image }} style={styles.courseImage} />
            <View style={styles.courseContent}>
              <Text style={styles.courseTitle}>{course.title}</Text>
              <Text style={styles.courseDescription} numberOfLines={2}>
                {course.description}
              </Text>

              <View style={styles.courseStats}>
                <View style={styles.courseStat}>
                  <Clock color={Colors.textSecondary} size={16} />
                  <Text style={styles.courseStatText}>{course.duration}</Text>
                </View>
                <View style={styles.courseStat}>
                  <BookOpen color={Colors.textSecondary} size={16} />
                  <Text style={styles.courseStatText}>{course.modules} modules</Text>
                </View>
                <View style={styles.courseStat}>
                  <Users color={Colors.textSecondary} size={16} />
                  <Text style={styles.courseStatText}>{course.enrolled}</Text>
                </View>
              </View>

              <View style={styles.courseFooter}>
                <View>
                  <Text style={styles.coursePrice}>₹{course.price.toLocaleString()}</Text>
                  <View style={styles.ratingContainer}>
                    <Star color={Colors.accent} size={14} fill={Colors.accent} />
                    <Text style={styles.ratingText}>{course.rating} ({course.enrolled})</Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={[
                    styles.enrollButton,
                    isEnrolled(course.id) && styles.enrolledButton,
                  ]}
                  onPress={() => handleEnroll(course.id)}
                  disabled={isEnrolled(course.id)}
                >
                  <Text style={[
                    styles.enrollButtonText,
                    isEnrolled(course.id) && styles.enrolledButtonText,
                  ]}>
                    {isEnrolled(course.id) ? 'Enrolled' : 'Enroll Now'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
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
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    color: Colors.text,
  },
  headerSubtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  categoriesContainer: {
    paddingLeft: 20,
    marginBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    marginRight: 12,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
  },
  categoryTextActive: {
    color: Colors.surface,
  },
  coursesContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  courseCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  courseImage: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  courseContent: {
    padding: 16,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  courseStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  courseStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  courseStatText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  courseFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  coursePrice: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: Colors.primary,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  enrollButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  enrolledButton: {
    backgroundColor: Colors.success,
  },
  enrollButtonText: {
    fontSize: 15,
    fontWeight: 'bold' as const,
    color: Colors.surface,
  },
  enrolledButtonText: {
    color: Colors.surface,
  },
});
