import connexion
import six

from swagger_server.models.wet_kb import WetKB  # noqa: E501
from swagger_server.models.wet_tmd import WetToday  # noqa: E501
from swagger_server import util


def controller_get_wet_kb():  # noqa: E501
    """Returns all records from the wet_kb table.

     # noqa: E501


    :rtype: List[WetKB]
    """
    return 'do some magic!'


def controller_get_wet_kb_by_date(_date):  # noqa: E501
    """Returns wet_kb records for the specified date.

     # noqa: E501

    :param _date: 
    :type _date: str

    :rtype: List[WetKB]
    """
    _date = util.deserialize_date(_date)
    return 'do some magic!'


def controller_get_wet_tmd():  # noqa: E501
    """Returns all records from the wet_tmd table.

     # noqa: E501


    :rtype: List[WetToday]
    """
    return 'do some magic!'


def controller_get_wet_tmd_by_date(_date):  # noqa: E501
    """Returns wet_tmd records for the specified date.

     # noqa: E501

    :param _date: 
    :type _date: str

    :rtype: List[WetToday]
    """
    _date = util.deserialize_date(_date)
    return 'do some magic!'
