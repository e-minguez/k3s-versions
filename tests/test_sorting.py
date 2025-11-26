import unittest
from packaging.version import Version

class TestSortingLogic(unittest.TestCase):

    def test_semantic_version_sorting(self):
        # Sample data mimicking the structure from the API
        data = {
            "data": [
                {"name": "v1.25"},
                {"name": "v1.26"},
                {"name": "v1.24"},
                {"name": "v1.28"},
                {"name": "v1.27"},
            ]
        }

        # Correctly sorted list
        expected_sorted_names = ["v1.28", "v1.27", "v1.26", "v1.25", "v1.24"]

        # Sort the data using the same logic as in main.py
        sorted_data = sorted(data["data"], key=lambda d: Version(d['name']), reverse=True)

        # Extract the names of the sorted data
        sorted_names = [d['name'] for d in sorted_data]

        # Assert that the sorted names match the expected order
        self.assertEqual(sorted_names, expected_sorted_names)

if __name__ == '__main__':
    unittest.main()
