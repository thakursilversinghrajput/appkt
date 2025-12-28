import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, MapPin, Calendar, DollarSign, Briefcase, CheckCircle } from 'lucide-react-native';
import { useApp } from '@/contexts/AppContext';
import Colors from '@/constants/colors';

export default function InternshipsScreen() {
  const { internships, userProfile, applyToInternship } = useApp();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredInternships = internships.filter((internship) => {
    return (
      internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
      internship.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleApply = (internshipId: string) => {
    applyToInternship(internshipId);
  };

  const isApplied = (internshipId: string) => {
    return userProfile?.appliedInternships.includes(internshipId) || false;
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Internships</Text>
        <Text style={styles.headerSubtitle}>Kickstart your career</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search color={Colors.textSecondary} size={20} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search internships..."
            placeholderTextColor={Colors.textSecondary}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} style={styles.internshipsContainer}>
        {filteredInternships.map((internship) => (
          <View key={internship.id} style={styles.internshipCard}>
            <View style={styles.internshipHeader}>
              <View style={styles.companyIcon}>
                <Text style={styles.companyIconText}>{internship.company.charAt(0)}</Text>
              </View>
              <View style={styles.internshipHeaderInfo}>
                <Text style={styles.internshipTitle}>{internship.title}</Text>
                <Text style={styles.companyName}>{internship.company}</Text>
              </View>
              <View style={[styles.typeBadge, { backgroundColor: `${Colors.accent}15` }]}>
                <Text style={[styles.typeBadgeText, { color: Colors.accent }]}>{internship.type}</Text>
              </View>
            </View>

            <View style={styles.domainBadge}>
              <Briefcase color={Colors.primary} size={14} />
              <Text style={styles.domainText}>{internship.domain}</Text>
            </View>

            <Text style={styles.description} numberOfLines={3}>
              {internship.description}
            </Text>

            <View style={styles.detailsContainer}>
              <View style={styles.detailItem}>
                <MapPin color={Colors.textSecondary} size={16} />
                <Text style={styles.detailText}>{internship.location}</Text>
              </View>
              <View style={styles.detailItem}>
                <Calendar color={Colors.textSecondary} size={16} />
                <Text style={styles.detailText}>{internship.duration}</Text>
              </View>
              <View style={styles.detailItem}>
                <DollarSign color={Colors.textSecondary} size={16} />
                <Text style={styles.detailText}>{internship.stipend}</Text>
              </View>
            </View>

            <View style={styles.requirementsContainer}>
              <Text style={styles.requirementsTitle}>Requirements:</Text>
              <View style={styles.requirementsList}>
                {internship.requirements.map((req, index) => (
                  <View key={index} style={styles.requirementItem}>
                    <View style={styles.requirementDot} />
                    <Text style={styles.requirementText}>{req}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View style={styles.footer}>
              <Text style={styles.postedText}>Posted {internship.posted}</Text>
              <TouchableOpacity
                style={[
                  styles.applyButton,
                  isApplied(internship.id) && styles.appliedButton,
                ]}
                onPress={() => handleApply(internship.id)}
                disabled={isApplied(internship.id)}
              >
                {isApplied(internship.id) ? (
                  <>
                    <CheckCircle color={Colors.surface} size={16} />
                    <Text style={styles.appliedButtonText}>Applied</Text>
                  </>
                ) : (
                  <Text style={styles.applyButtonText}>Apply Now</Text>
                )}
              </TouchableOpacity>
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
  internshipsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  internshipCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  internshipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  companyIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  companyIconText: {
    fontSize: 20,
    fontWeight: 'bold' as const,
    color: Colors.surface,
  },
  internshipHeaderInfo: {
    flex: 1,
    marginLeft: 12,
  },
  internshipTitle: {
    fontSize: 16,
    fontWeight: 'bold' as const,
    color: Colors.text,
  },
  companyName: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  typeBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  domainBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: `${Colors.primary}10`,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  domainText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.primary,
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 16,
  },
  detailsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  detailText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  requirementsContainer: {
    marginBottom: 16,
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: '600' as const,
    color: Colors.text,
    marginBottom: 8,
  },
  requirementsList: {
    gap: 6,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  requirementDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
  requirementText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  postedText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  applyButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  applyButtonText: {
    fontSize: 14,
    fontWeight: 'bold' as const,
    color: Colors.surface,
  },
  appliedButton: {
    backgroundColor: Colors.success,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  appliedButtonText: {
    fontSize: 14,
    fontWeight: 'bold' as const,
    color: Colors.surface,
  },
});
