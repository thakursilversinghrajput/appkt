import AsyncStorage from '@react-native-async-storage/async-storage';
import createContextHook from '@nkzw/create-context-hook';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { courses, Course } from '@/mocks/courses';
import { internships, Internship } from '@/mocks/internships';
import { services, Service } from '@/mocks/services';

interface UserProfile {
  name: string;
  email: string;
  enrolledCourses: string[];
  appliedInternships: string[];
}

interface AppState {
  courses: Course[];
  internships: Internship[];
  services: Service[];
  userProfile: UserProfile | null;
  isLoading: boolean;
  enrollInCourse: (courseId: string) => void;
  applyToInternship: (internshipId: string) => void;
  updateProfile: (profile: UserProfile) => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Guest User',
  email: '',
  enrolledCourses: [],
  appliedInternships: [],
};

export const [AppProvider, useApp] = createContextHook<AppState>(() => {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  const profileQuery = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const stored = await AsyncStorage.getItem('userProfile');
      return stored ? JSON.parse(stored) : DEFAULT_PROFILE;
    },
  });

  const saveMutation = useMutation({
    mutationFn: async (profile: UserProfile) => {
      await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
      return profile;
    },
    onSuccess: (data) => {
      setUserProfile(data);
    },
  });

  useEffect(() => {
    if (profileQuery.data) {
      setUserProfile(profileQuery.data);
    }
  }, [profileQuery.data]);

  const enrollInCourse = (courseId: string) => {
    if (!userProfile) return;
    const updated = {
      ...userProfile,
      enrolledCourses: [...userProfile.enrolledCourses, courseId],
    };
    saveMutation.mutate(updated);
  };

  const applyToInternship = (internshipId: string) => {
    if (!userProfile) return;
    const updated = {
      ...userProfile,
      appliedInternships: [...userProfile.appliedInternships, internshipId],
    };
    saveMutation.mutate(updated);
  };

  const updateProfile = (profile: UserProfile) => {
    saveMutation.mutate(profile);
  };

  return {
    courses,
    internships,
    services,
    userProfile,
    isLoading: profileQuery.isLoading,
    enrollInCourse,
    applyToInternship,
    updateProfile,
  };
});
