# coding: utf-8

from __future__ import absolute_import

from flask import json
from six import BytesIO

from swagger_server.models.wet_kb import WetKB  # noqa: E501
from swagger_server.models.wet_tmd import WetToday  # noqa: E501
from swagger_server.test import BaseTestCase


class TestDefaultController(BaseTestCase):
    """DefaultController integration test stubs"""

    def test_controller_get_wet_kb(self):
        """Test case for controller_get_wet_kb

        Returns all records from the wet_kb table.
        """
        response = self.client.open(
            '/wet-kb',
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_controller_get_wet_kb_by_date(self):
        """Test case for controller_get_wet_kb_by_date

        Returns wet_kb records for the specified date.
        """
        response = self.client.open(
            '/wet-kb/{date}'.format(_date='2013-10-20'),
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_controller_get_wet_tmd(self):
        """Test case for controller_get_wet_tmd

        Returns all records from the wet_tmd table.
        """
        response = self.client.open(
            '/wet-today',
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))

    def test_controller_get_wet_tmd_by_date(self):
        """Test case for controller_get_wet_tmd_by_date

        Returns wet_tmd records for the specified date.
        """
        response = self.client.open(
            '/wet-today/{date}'.format(_date='2013-10-20'),
            method='GET')
        self.assert200(response,
                       'Response body is : ' + response.data.decode('utf-8'))


if __name__ == '__main__':
    import unittest
    unittest.main()
