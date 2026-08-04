"""
Day 23 Report Management Integration Test

Tests:
1. Report History
2. Report Statistics
3. Report Search
4. Report Export
"""

import requests

BASE_URL = "http://127.0.0.1:8000/api/v1"

print("=" * 60)
print("DAY 23 REPORT MANAGEMENT TEST")
print("=" * 60)

# --------------------------------------------------
# 1. Report History
# --------------------------------------------------

print("\n1. Report History")

response = requests.get(
    f"{BASE_URL}/reports/history"
)

print("Status:", response.status_code)

if response.status_code == 200:

    result = response.json()

    if "data" in result:

        print("Total Reports:",
              result["data"]["total_reports"])

        print("History:")

        for report in result["data"]["history"]:

            print(report)

    else:

        print(result)

else:

    print(response.text)


# --------------------------------------------------
# 2. Report Statistics
# --------------------------------------------------

print("\n2. Report Statistics")

response = requests.get(
    f"{BASE_URL}/reports/statistics"
)

print("Status:", response.status_code)

if response.status_code == 200:

    result = response.json()

    if "data" in result:

        print("Total Reports:",
              result["data"]["total_reports"])

        print("Total Topics:",
              result["data"]["total_topics"])

        print("Most Popular Topic:",
              result["data"]["most_popular_topic"])

        print("Latest Report:",
              result["data"]["latest_report"])

    else:

        print(result)

else:

    print(response.text)


# --------------------------------------------------
# 3. Report Search
# --------------------------------------------------

print("\n3. Report Search")

response = requests.get(
    f"{BASE_URL}/reports/search",
    params={
        "query": "Agentic"
    }
)

print("Status:", response.status_code)

if response.status_code == 200:

    result = response.json()

    if "data" in result:

        print(result["data"])

    else:

        print(result)

else:

    print(response.text)


# --------------------------------------------------
# 4. Export History
# --------------------------------------------------

print("\n4. Export Report History")

response = requests.get(
    f"{BASE_URL}/reports/export"
)

print("Status:", response.status_code)

if response.status_code == 200:

    print("Report history exported successfully.")

else:

    print(response.text)


print("\n")
print("=" * 60)
print("DAY 23 REPORT MANAGEMENT TEST COMPLETED")
print("=" * 60)